import JackTokenizer from '../tokenizer'
import ParserException from './parserException'
import { KEYWORDS } from '../tokenizer/utils/regex'
import { TOKEN_TYPE } from '../tokenizer/types'
// eslint-disable-next-line
import VMWriter from '../vmWriter'
import {
  convertToArray,
  OPERATORS,
  UNARY_OPERATORS,
  VM_BINARY_COMMANDS_MAPPING,
  VM_UNARY_COMMANDS_MAPPING
} from './utils'
import { KIND_TYPE } from '../symbolTable/types'
import { SEGMENTS, COMMANDS } from '../vmWriter/types'
import TokenException from '../tokenizer/TokenException'

class CompilationEngine {
  /**
    * @param {string} jackCode jack code
    * @param {VMWriter} vmWritter vm writter
    * @param {SymbolTable} symbolTable symbol table
  */
  constructor (jackCode, vmWritter, symbolTable) {
    this.tokenizer = new JackTokenizer(jackCode)
    this.vmWriter = vmWritter
    this.symbolTable = symbolTable
    this.className = ''
    this.currentSubroutineName = ''
    this.initializeWhile()
    this.initializeIf()
  }

  initializeWhile () {
    this.whileCounter = -1
    this.whileStartLabel = 'WHILE_EXP'
    this.whileEndLabel = 'WHILE_END'
  }

  initializeIf () {
    this.ifCounter = -1
    this.ifTrueLabel = 'IF_TRUE'
    this.ifFalseLabel = 'IF_FALSE'
    this.ifEndLabel = 'IF_END'
  }

  /**
   * Compiles a complete class
   * `class className { classVarDec* subroutineDec* }`
   */
  compileClass () {
    const { tokenizer } = this
    if (!tokenizer.hasMoreTokens()) return
    tokenizer.advance()

    this.errorMiddleware({ [TOKEN_TYPE.KEYWORD]: KEYWORDS.CLASS })

    this.assert({ [TOKEN_TYPE.IDENTIFIER]: null })
    this.className = tokenizer.tokenValue()

    this.assert({ [TOKEN_TYPE.SYMBOL]: '{' })

    this.compileClassVarDec()
    this.compileSubroutine()

    this.assert({ [TOKEN_TYPE.SYMBOL]: '}' })
    // check if there is an extra token
    if (!tokenizer.hasMoreTokens()) return
    tokenizer.advance()
    throw new ParserException(`Found an extra token '${tokenizer.tokenValue()}'`)
  }

  /**
   * Compiles a static declaration or a field declaration
   * `(static | field) type varName(',', varName)*;`
   */
  compileClassVarDec () {
    const { tokenizer } = this
    tokenizer.advance()
    if (
      !([KEYWORDS.STATIC, KEYWORDS.FIELD].includes(tokenizer.tokenValue()))
    ) return tokenizer.back()
    const kind = tokenizer.tokenValue()

    this.compileType()
    const type = tokenizer.tokenValue()

    while (true) {
      this.assert({ [TOKEN_TYPE.IDENTIFIER]: null })
      const name = tokenizer.tokenValue()
      this.symbolTable.define(name, type, kind)

      tokenizer.advance()
      if (tokenizer.tokenValue() !== ',') {
        tokenizer.back()
        break
      }
    }
    this.assert({ [TOKEN_TYPE.SYMBOL]: ';' })

    this.compileClassVarDec()
  }

  /**
   * Compiles a type
   * `'int' | 'char' | 'boolean' | className(identifier)`
   * [TOKEN_TYPE.IDENTIFIER]: null means the token type should be identifier,
   * its value can be any.
   * But for [TOKEN_TYPE.KEYWORD] : [KEYWORDS.INT, KEYWORDS.CHAR, KEYWORDS.BOOLEAN],
   * it means it the token type should be a keyword and its values should be either
   * int or char or boolean.
   */
  compileType () {
    this.assert({
      [TOKEN_TYPE.KEYWORD]: [KEYWORDS.INT, KEYWORDS.CHAR, KEYWORDS.BOOLEAN],
      [TOKEN_TYPE.IDENTIFIER]: null
    })
  }

  /**
   * Compiles a complete method, function, or constructor.
   * `(constructor | function | method) (void | type) subroutineName '('parameterList ')' subroutineBody`
   */
  compileSubroutine () {
    const { tokenizer } = this
    tokenizer.advance()
    const validKeywords = [KEYWORDS.CONSTRUCTOR, KEYWORDS.FUNCTION, KEYWORDS.METHOD]
    if (
      !validKeywords.includes(tokenizer.tokenValue())
    ) return tokenizer.back()
    const subroutineType = tokenizer.tokenValue()
    // reset label counters
    this.whileCounter = -1
    this.ifCounter = -1

    this.symbolTable.startSubroutine()

    tokenizer.advance()
    this.errorMiddleware({
      [TOKEN_TYPE.KEYWORD]: [KEYWORDS.VOID, KEYWORDS.INT, KEYWORDS.CHAR, KEYWORDS.BOOLEAN],
      [TOKEN_TYPE.IDENTIFIER]: null
    })

    const value = tokenizer.tokenValue()
    if (value !== KEYWORDS.VOID) {
      tokenizer.back()
      this.compileType()
    }

    this.assert({ [TOKEN_TYPE.IDENTIFIER]: null })
    this.currentSubroutineName = tokenizer.tokenValue()

    this.assert({ [TOKEN_TYPE.SYMBOL]: '(' })

    // The first argument for methods should be the object reference,
    // the method supposed to be operate.
    // We should add an ARG variable to the subroutine symbol table,
    // so that the index for method arguments will start from 1.
    if (
      subroutineType === KEYWORDS.METHOD
    ) this.symbolTable.define('this', this.className, KIND_TYPE.ARG)
    this.compileParameterList()

    this.assert({ [TOKEN_TYPE.SYMBOL]: ')' })

    this.compileSubroutineBody(subroutineType)
    this.compileSubroutine()
  }

  /**
   * Compiles a subroutine body
   * `'{' varDec* statements '}'`
   */
  compileSubroutineBody (subroutineType) {
    this.assert({ [TOKEN_TYPE.SYMBOL]: '{' })
    this.compileVarDec()
    const numOfLocalVariables = this.symbolTable.varCount(KIND_TYPE.VAR)
    this.vmWriter.writeFunction(this.getFunctionName(), numOfLocalVariables)
    this.compileSubroutineType(subroutineType)
    this.compileStatements()
    this.assert({ [TOKEN_TYPE.SYMBOL]: '}' })
  }

  /**
   * Compiles a subroutine type
   */
  compileSubroutineType (type) {
    switch (type) {
      case KEYWORDS.CONSTRUCTOR: {
        const numOfFields = this.symbolTable.varCount(KIND_TYPE.FIELD)
        this.vmWriter.writePush(SEGMENTS.CONSTANT, numOfFields)
        this.vmWriter.writeCall('Memory.alloc', 1)
        this.vmWriter.writePop(SEGMENTS.POINTER, 0)
      }
        break
      case KEYWORDS.METHOD:
        this.vmWriter.writePush(SEGMENTS.ARGUMENT, 0)
        this.vmWriter.writePop(SEGMENTS.POINTER, 0)
        break
    }
  }

  /**
   * @returns {string} class name concat with current subroutine name
   */
  getFunctionName () {
    return `${this.className}.${this.currentSubroutineName}`
  }

  assert (expectedTypesandValues) {
    this.tokenizer.advance()
    this.errorMiddleware(expectedTypesandValues)
  }

  /**
   * Compiles a (possible empty) parameter list, not including
   * the enclosing '()'.
   * `((type varName) (',' type varName)*)?`
   */
  compileParameterList () {
    const { tokenizer } = this
    const isParameterEnd = this.lookAhead(')')
    if (isParameterEnd) return

    while (true) {
      this.compileType()
      const type = this.tokenizer.tokenValue()
      this.assert({ [TOKEN_TYPE.IDENTIFIER]: null })
      const name = tokenizer.tokenValue()
      this.symbolTable.define(name, type, KIND_TYPE.ARG)
      tokenizer.advance()
      if (tokenizer.tokenValue() !== ',') {
        tokenizer.back()
        break
      }
    }
  }

  /**
   * Compiles a var declaration
   * `'var' type varName(',' varName)* ';'`
   */
  compileVarDec () {
    if (!this.lookAhead(KEYWORDS.VAR)) return

    this.assert({ [TOKEN_TYPE.KEYWORD]: KEYWORDS.VAR })
    this.compileType()
    const type = this.tokenizer.tokenValue()
    while (true) {
      this.assert({ [TOKEN_TYPE.IDENTIFIER]: null })
      const name = this.tokenizer.tokenValue()
      this.symbolTable.define(name, type, KIND_TYPE.VAR)

      this.tokenizer.advance()
      if (this.tokenizer.tokenValue() !== ',') {
        this.tokenizer.back()
        break
      }
    }
    this.assert({ [TOKEN_TYPE.SYMBOL]: ';' })
    this.compileVarDec()
  }

  /**
   * Compiles a sequence of statements, not including the enclosing "{}".
   * `statement*`
   */
  compileStatements () {
    const validKeywords = [
      KEYWORDS.LET, KEYWORDS.IF, KEYWORDS.WHILE, KEYWORDS.DO, KEYWORDS.RETURN
    ]
    if (!this.lookAhead(validKeywords)) return

    while (true) {
      this.tokenizer.advance()
      const value = this.tokenizer.tokenValue()
      this.tokenizer.back()
      if (!validKeywords.includes(value)) break
      switch (value) {
        case KEYWORDS.LET:
          this.compileLet()
          break
        case KEYWORDS.IF:
          this.compileIf()
          break
        case KEYWORDS.WHILE:
          this.compileWhile()
          break
        case KEYWORDS.DO:
          this.compileDo()
          break
        case KEYWORDS.RETURN:
          this.compileReturn()
          break
      }
    }
  }

  /**
   * Compiles a `do` statement
   * `'do' subroutineCall ';'`
   */
  compileDo () {
    this.assert({ [TOKEN_TYPE.KEYWORD]: KEYWORDS.DO })
    this.compileSubroutineCall()
    this.assert({ [TOKEN_TYPE.SYMBOL]: ';' })
    this.vmWriter.writePop(SEGMENTS.TEMP, 0)
  }

  /**
   * Compiles a subroutine call
   * `subroutineName '(' expressionList ')' | (className | varName) '.' subroutineName '(' expressionList ')'`
   */
  compileSubroutineCall () {
    this.assert({ [TOKEN_TYPE.IDENTIFIER]: null })
    // Eg, `game.play()` `game` is the first idenifier, and
    // `play` is the second identifier.
    const firstIdentifier = this.tokenizer.tokenValue()
    let callResult = null
    let nArgs = 0
    this.tokenizer.advance()
    const value = this.tokenizer.tokenValue()
    // method/function call
    if (value === '.') {
      this.assert({ [TOKEN_TYPE.IDENTIFIER]: null })
      callResult = this.compileObjectCall(
        firstIdentifier, this.tokenizer.tokenValue()
      )
    } else {
      this.tokenizer.back()
      callResult = this.compileMethodCall(this.tokenizer.tokenValue())
    }

    const [subroutineName, isMethodCall] = callResult

    this.assert({ [TOKEN_TYPE.SYMBOL]: '(' })
    nArgs += this.compileExpressionList()
    this.assert({ [TOKEN_TYPE.SYMBOL]: ')' })

    // If it is a method call the object reference the method suppposed to
    // operate must be passed as a first argument, so nArgs should be increment by 1
    this.vmWriter.writeCall(subroutineName, isMethodCall ? nArgs + 1 : nArgs)
  }

  compileMethodCall (methodName) {
    this.vmWriter.writePush(SEGMENTS.POINTER, 0)
    return [`${this.className}.${methodName}`, true]
  }

  compileObjectCall (objectName, methodName) {
    // Is objectName a reference for an object
    const segment = this.symbolTable.segmentOf(objectName)
    if (segment) {
      const objectIndex = this.symbolTable.indexOf(objectName)
      const objectType = this.symbolTable.typeOf(objectName)
      this.vmWriter.writePush(segment, objectIndex)
      return [`${objectType}.${methodName}`, true]
    }
    // If objectName is not in the symbol table,
    // `objectName` will be the class name.
    return [`${objectName}.${methodName}`, false]
  }

  /**
   * Compiles a `let` statement
   * `'let' varName ('[' expression ']')? '=' expression ';'`
   */
  compileLet () {
    this.assert({ [TOKEN_TYPE.KEYWORD]: KEYWORDS.LET })
    this.assert({ [TOKEN_TYPE.IDENTIFIER]: null })
    const identifier = this.tokenizer.tokenValue()
    this.tokenizer.advance()
    const value = this.tokenizer.tokenValue()
    let isVariableArray = false
    if (value === '[') {
      isVariableArray = true
      this.compileExpression()
      this.assert({ [TOKEN_TYPE.SYMBOL]: ']' })
      this.compileArrayVariable(identifier)
    } else this.tokenizer.back()

    this.assert({ [TOKEN_TYPE.SYMBOL]: '=' })
    this.compileExpression()
    this.assert({ [TOKEN_TYPE.SYMBOL]: ';' })
    this.compileLetAssignment(isVariableArray, identifier)
  }

  /**
   * Compiles array left expression.
   * Eg, `let numbers[i] = 5`
   * @param {string} array array identifier
   * @returns {string} vm commands for array left expression
   */
  compileArrayVariable (array) {
    this.vmWriter.writePush(
      this.symbolTable.segmentOf(array),
      this.symbolTable.indexOf(array)
    )
    this.vmWriter.writeArithmetic(COMMANDS.ADD)
  }

  /**
   * Compiles array right expression(value of an array).
   * Eg, `let age = numbers[3]`
   * @param {string} array array identifier
   * @returns {string} vm commands for array right expression
   */
  compileArrayValue (array) {
    this.compileArrayVariable(array)
    this.vmWriter.writePop(SEGMENTS.POINTER, 1)
    this.vmWriter.writePush(SEGMENTS.THAT, 0)
  }

  compileLetAssignment (isArrayAssignment, variable) {
    if (isArrayAssignment) {
      this.vmWriter.writePop(SEGMENTS.TEMP, 0)
      this.vmWriter.writePop(SEGMENTS.POINTER, 1)
      this.vmWriter.writePush(SEGMENTS.TEMP, 0)
      this.vmWriter.writePop(SEGMENTS.THAT, 0)
      return
    }

    const index = this.symbolTable.indexOf(variable)
    this.vmWriter.writePop(this.symbolTable.segmentOf(variable), index)
  }

  /**
   * Compiles a `while` statement
   * `'while' '(' expression ')' '{' statements '}'`
   */
  compileWhile () {
    ++this.whileCounter
    const startLabel = this.whileStartLabel + this.whileCounter
    const endLabel = this.whileEndLabel + this.whileCounter
    this.vmWriter.writeLabel(startLabel)

    this.assert({ [TOKEN_TYPE.KEYWORD]: KEYWORDS.WHILE })
    this.assert({ [TOKEN_TYPE.SYMBOL]: '(' })
    this.compileExpression()
    this.assert({ [TOKEN_TYPE.SYMBOL]: ')' })

    this.vmWriter.writeArithmetic(COMMANDS.NOT)
    this.vmWriter.writeIf(endLabel)

    this.assert({ [TOKEN_TYPE.SYMBOL]: '{' })
    this.compileStatements()
    this.assert({ [TOKEN_TYPE.SYMBOL]: '}' })

    this.vmWriter.writeGoto(startLabel)
    this.vmWriter.writeLabel(endLabel)
  }

  /**
   * Compiles a `return` statement
   * `'return' expression? ';'`
   */
  compileReturn () {
    this.assert({ [TOKEN_TYPE.KEYWORD]: KEYWORDS.RETURN })
    this.tokenizer.advance()
    const value = this.tokenizer.tokenValue()
    if (value !== ';') {
      this.tokenizer.back()
      this.compileExpression()
      this.assert({ [TOKEN_TYPE.SYMBOL]: ';' })
    } else this.vmWriter.writePush(SEGMENTS.CONSTANT, 0)
    this.vmWriter.writeReturn()
  }

  /**
   * Compiles an `if` statement, possibly with a trailing `else` clause
   * `'if' '(' expression ')' '{' statements '}' ('else' '{' statements '}')?`
   */
  compileIf () {
    ++this.ifCounter
    const trueLabel = this.ifTrueLabel + this.ifCounter
    const falseLabel = this.ifFalseLabel + this.ifCounter
    const endLabel = this.ifEndLabel + this.ifCounter

    this.assert({ [TOKEN_TYPE.KEYWORD]: KEYWORDS.IF })
    this.assert({ [TOKEN_TYPE.SYMBOL]: '(' })
    this.compileExpression()
    this.assert({ [TOKEN_TYPE.SYMBOL]: ')' })

    this.vmWriter.writeIf(trueLabel)
    this.vmWriter.writeGoto(falseLabel)
    this.vmWriter.writeLabel(trueLabel)

    this.assert({ [TOKEN_TYPE.SYMBOL]: '{' })
    this.compileStatements()

    this.assert({ [TOKEN_TYPE.SYMBOL]: '}' })
    this.tokenizer.advance()
    const value = this.tokenizer.tokenValue()
    if (value === KEYWORDS.ELSE) {
      this.vmWriter.writeGoto(endLabel)
      this.vmWriter.writeLabel(falseLabel)

      this.assert({ [TOKEN_TYPE.SYMBOL]: '{' })
      this.compileStatements()
      this.assert({ [TOKEN_TYPE.SYMBOL]: '}' })

      this.vmWriter.writeLabel(endLabel)
    } else {
      this.vmWriter.writeLabel(falseLabel)
      this.tokenizer.back()
    }
  }

  /**
   * Compiles an expression
   */
  compileExpression () {
    this.compileTerm()
    while (true) {
      this.tokenizer.advance()
      const value = this.tokenizer.tokenValue()
      if (!OPERATORS.includes(value)) {
        this.tokenizer.back()
        break
      }
      this.compileTerm()
      this.vmWriter.writeArithmetic(VM_BINARY_COMMANDS_MAPPING[value])
    }
  }

  /**
   * Compiles a term. This routine is faced with a slight difficulty when
   * trying to decide between some of the alternative parsing rules.
   * Specifically, if the current token is an identifier, the routine must
   * distinguish between a variable, an array entry, and a subroutine call.
   * A single look a head token(LL(0)), which may be one of ".", "[", "("
   * suffices to distinguish between the three posibilities.
   * Any other token is not part of this term and should not be advanced over.
   * `integerConstant | stringConstant | keywordConstant | varName |
   * varName'[' expression ']' | subroutineCall | '(' expression ')' | unaryOp term`
   */
  compileTerm () {
    const { tokenizer } = this
    tokenizer.advance()
    const type = tokenizer.tokenType()

    switch (type) {
      case TOKEN_TYPE.INTEGER_CONSTANT:
        this.vmWriter.writePush(SEGMENTS.CONSTANT, tokenizer.intVal())
        break
      case TOKEN_TYPE.STRING_CONSTANT:
        this.compileStringConstant(tokenizer.stringVal())
        break
      case TOKEN_TYPE.KEYWORD:
        tokenizer.back()
        this.compileKeywordConstant()
        break
      case TOKEN_TYPE.SYMBOL: {
        const tokenValue = tokenizer.tokenValue()
        if (tokenValue === '(') {
          this.compileExpression()
          this.assert({ [TOKEN_TYPE.SYMBOL]: ')' })
        } else if (UNARY_OPERATORS.includes(tokenValue)) {
          this.compileTerm()
          this.vmWriter.writeArithmetic(VM_UNARY_COMMANDS_MAPPING[tokenValue])
        } else {
          throw new ParserException(
            `Expected '(' OR '-, ~' but found ${type.toUpperCase()} '${tokenValue}'`
          )
        }
      }
        break
      case TOKEN_TYPE.IDENTIFIER:
        // is function/method call
        if (this.lookAhead(['.', '('])) {
          tokenizer.back()
          this.compileSubroutineCall()
        } else if (this.lookAhead('[')) {
          const identifier = tokenizer.tokenValue()
          // array call
          this.assert({ [TOKEN_TYPE.SYMBOL]: '[' })
          this.compileExpression()
          this.assert({ [TOKEN_TYPE.SYMBOL]: ']' })
          this.compileArrayValue(identifier)
        } else {
          this.compileIdentifier(tokenizer.tokenValue())
        }
        break
      default: {
        const tokenTypes = [TOKEN_TYPE.INTEGER_CONSTANT, TOKEN_TYPE.STRING_CONSTANT, TOKEN_TYPE.IDENTIFIER]
        const msg = `${tokenTypes.map(t => t.toUpperCase()).join(' | ')} | 'true, false, null, this' |
        'varName[expression]' | 'subroutineCall' | '(expression)' | '-, ~'`
        throw new ParserException(`Expected ${msg} but found ${type.toUpperCase()} ${tokenizer.tokenValue()}`)
      }
    }
  }

  /**
   * Returns vm commands for an identifier.
   * @param {string} identifier identifier
   * @throws {TokenException} if identifier is not in both subroutine
   * and class symbol tables.
   */
  compileIdentifier (identifier) {
    const index = this.symbolTable.indexOf(identifier)
    const segment = this.symbolTable.segmentOf(identifier)
    if (segment) return this.vmWriter.writePush(segment, index)
    throw new TokenException(
      `In subroutine ${this.currentSubroutineName}: ${identifier} is not defined as a field,
      parameter or local or static variable`
    )
  }

  /**
   * Compiles a string constant.
   * @param {String} str string constant
   * @returns {String} vm commands for a string constant
   */
  compileStringConstant (str) {
    const length = str.length
    this.vmWriter.writePush(SEGMENTS.CONSTANT, length)
    this.vmWriter.writeCall('String.new', 1)

    for (let i = 0; i < length; i++) {
      const asciiCode = str.charCodeAt(i)
      this.vmWriter.writePush(SEGMENTS.CONSTANT, asciiCode)
      this.vmWriter.writeCall('String.appendChar', 2)
    }
  }

  compileKeywordConstant () {
    this.assert({
      [TOKEN_TYPE.KEYWORD]: [
        KEYWORDS.TRUE, KEYWORDS.FALSE, KEYWORDS.NULL, KEYWORDS.THIS
      ]
    })
    const keyword = this.tokenizer.tokenValue()
    switch (keyword) {
      case KEYWORDS.TRUE:
        this.vmWriter.writePush(SEGMENTS.CONSTANT, 0)
        this.vmWriter.writeArithmetic(VM_UNARY_COMMANDS_MAPPING['~'])
        break
      case KEYWORDS.THIS:
        this.vmWriter.writePush(SEGMENTS.POINTER, 0)
        break
      case KEYWORDS.NULL:
      case KEYWORDS.FALSE:
        this.vmWriter.writePush(SEGMENTS.CONSTANT, 0)
        break
    }
  }

  /**
   * Compiles a (possibly empty) comma-separated list of expressions.
   * `(expression (',' expression)*)?`
   */
  compileExpressionList () {
    let nArgs = 0
    const isExpressionEnd = this.lookAhead(')')
    if (isExpressionEnd) return nArgs
    while (true) {
      this.compileExpression()
      nArgs++
      this.tokenizer.advance()
      const value = this.tokenizer.tokenValue()
      if (value !== ',') {
        this.tokenizer.back()
        break
      }
    }

    return nArgs
  }

  /**
   * Asserts if the expected token type and token value is equal witht the
   * current token type and value
   * @param {{ TOKEN_TYPE: any }} expectedTypesAndValues
   * @throws {ParserException} if current tokens value and type don't match with
   * the expected types and values.
   */
  errorMiddleware (expectedTypesAndValues) {
    const value = this.tokenizer.tokenValue()
    const type = this.tokenizer.tokenType()
    const expectedTypes = Object.keys(expectedTypesAndValues)
    const expectedTypesMsg = expectedTypes.map(t => t.toUpperCase()).join(' OR ')
    const expectedValuesMsg = Object.values(expectedTypesAndValues)
      .filter(Boolean).join(' OR ')

    const msg = `Expected ${expectedTypesMsg}, '${expectedValuesMsg}', but found ${type.toUpperCase()} '${value}'`
    if (
      !expectedTypes.includes(type)
    ) throw new ParserException(msg)

    const expectedValues = expectedTypesAndValues[type]
    // If types match but no values, `ParserException` shouldn't be thrown.
    if (!expectedValues) return
    const expectedValuesArray = convertToArray(expectedValues)
    if (expectedValuesArray.includes(value)) return

    throw new ParserException(msg)
  }

  /**
   * Checks if the next token is equal with the expected token.
   * It won't change the tokenizer position.
   * @param {string|string[]} expectedToken token we want to check
   * @returns {boolean} true if the next token is equal with the expected token
   */
  lookAhead (expectedToken) {
    this.tokenizer.advance()
    const value = this.tokenizer.tokenValue()
    this.tokenizer.back()
    expectedToken = convertToArray(expectedToken)
    if (expectedToken.includes(value)) return true
    return false
  }
}

export default CompilationEngine
