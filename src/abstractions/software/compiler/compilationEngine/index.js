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
import emitter from 'components/Emitter'

const IS_TEST = process.env.NODE_ENV === 'test'

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
    this.currentSubroutineType = ''
    this.currentSubroutineVarCount = ''
    this.initializeWhile()
    this.initializeIf()
    this.observers = []
    this.scopes = []
  }

  subscribe (observer) {
    this.observers.push(observer)
    const index = this.observers.indexOf(observer)
    return () => this.observers.splice(index, 1)
  }

  notify (data) {
    const finalData = {
      className: this.className,
      currentSubroutine: {
        name: this.currentSubroutineName,
        type: this.currentSubroutineType,
        varCount: this.currentSubroutineVarCount
      },
      scopes: JSON.stringify(this.scopes),
      ...data
    }
    this.observers.forEach(observer => observer(finalData))
  }

  pushScope (scope) {
    this.scopes.push(scope)
    this.notify({
      scopes: JSON.stringify(this.scopes)
    })
  }

  popScope () {
    this.scopes.pop()
    this.notify({
      scopes: JSON.stringify(this.scopes)
    })
  }

  getTokenizer () {
    return this.tokenizer
  }

  getSymbolTable () {
    return this.symbolTable
  }

  getVMWriter () {
    return this.vmWriter
  }

  async pause () {
    if (IS_TEST) return Promise.resolve()
    emitter.emit('clear')
    return new Promise(resolve => emitter.once('next', resolve))
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
  async compileClass () {
    this.pushScope('compile class')
    await this.pause()
    const { tokenizer } = this
    if (!tokenizer.hasMoreTokens()) {
      this.popScope()
      return
    }

    this.assert({ [TOKEN_TYPE.KEYWORD]: KEYWORDS.CLASS })

    this.assert({ [TOKEN_TYPE.IDENTIFIER]: null })
    this.className = tokenizer.tokenValue()
    this.notify()

    this.assert({ [TOKEN_TYPE.SYMBOL]: '{' })

    await this.compileClassVarDec()
    await this.compileSubroutine()
    await this.pause()

    this.assert({ [TOKEN_TYPE.SYMBOL]: '}' })

    this.popScope()
    // check if there is an extra token
    if (!tokenizer.hasMoreTokens()) return
    tokenizer.advance()
    throw new ParserException(`Found an extra token '${tokenizer.tokenValue()}'`)
  }

  /**
   * Compiles a static declaration or a field declaration
   * `(static | field) type varName(',', varName)*;`
   */
  async compileClassVarDec () {
    this.pushScope('compile class var dec')
    await this.pause()
    const { tokenizer } = this
    tokenizer.advance()
    if (
      !([KEYWORDS.STATIC, KEYWORDS.FIELD].includes(tokenizer.tokenValue()))
    ) {
      this.popScope()
      tokenizer.back()
      return Promise.resolve()
    }
    const kind = tokenizer.tokenValue()

    await this.compileType()
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

    await this.compileClassVarDec()
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
  async compileType () {
    this.pushScope('compile type')
    await this.pause()
    this.assert({
      [TOKEN_TYPE.KEYWORD]: [KEYWORDS.INT, KEYWORDS.CHAR, KEYWORDS.BOOLEAN],
      [TOKEN_TYPE.IDENTIFIER]: null
    })
    this.popScope()
  }

  /**
   * Compiles a complete method, function, or constructor.
   * `(constructor | function | method) (void | type) subroutineName '('parameterList ')' subroutineBody`
   */
  async compileSubroutine () {
    this.pushScope('compile subroutine')
    await this.pause()
    const { tokenizer } = this
    tokenizer.advance()
    const validKeywords = [KEYWORDS.CONSTRUCTOR, KEYWORDS.FUNCTION, KEYWORDS.METHOD]
    if (
      !validKeywords.includes(tokenizer.tokenValue())
    ) {
      this.popScope()
      tokenizer.back()
      return Promise.resolve()
    }
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
      await this.compileType()
    }

    this.assert({ [TOKEN_TYPE.IDENTIFIER]: null })
    this.currentSubroutineName = tokenizer.tokenValue()
    this.currentSubroutineType = subroutineType
    this.notify()

    this.assert({ [TOKEN_TYPE.SYMBOL]: '(' })

    // The first argument for methods should be the object reference,
    // the method supposed to be operate.
    // We should add an ARG variable to the subroutine symbol table,
    // so that the index for method arguments will start from 1.
    if (
      subroutineType === KEYWORDS.METHOD
    ) this.symbolTable.define('this', this.className, KIND_TYPE.ARG)
    await this.compileParameterList()

    this.assert({ [TOKEN_TYPE.SYMBOL]: ')' })

    await this.compileSubroutineBody(subroutineType)

    this.popScope()
    await this.compileSubroutine()
  }

  /**
   * Compiles a subroutine body
   * `'{' varDec* statements '}'`
   */
  async compileSubroutineBody (subroutineType) {
    this.pushScope('compile subroutine body')
    await this.pause()
    this.assert({ [TOKEN_TYPE.SYMBOL]: '{' })
    await this.compileVarDec()
    const numOfLocalVariables = this.symbolTable.varCount(KIND_TYPE.VAR)

    this.currentSubroutineVarCount = numOfLocalVariables
    this.notify()

    this.vmWriter.writeFunction(this.getFunctionName(), numOfLocalVariables)
    this.compileSubroutineType(subroutineType)
    await this.compileStatements()
    this.assert({ [TOKEN_TYPE.SYMBOL]: '}' })
    this.popScope()
  }

  /**
   * Compiles a subroutine type
   */
  compileSubroutineType (type) {
    // eslint-disable-next-line
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
  async compileParameterList () {
    this.pushScope('compile parameter list')
    await this.pause()
    const { tokenizer } = this
    const isParameterEnd = this.lookAhead(')')
    if (isParameterEnd) {
      this.popScope()
      return
    }

    while (true) {
      await this.compileType()
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

    this.popScope()
  }

  /**
   * Compiles a var declaration
   * `'var' type varName(',' varName)* ';'`
   */
  async compileVarDec () {
    this.pushScope('compile var dec')
    await this.pause()
    if (!this.lookAhead(KEYWORDS.VAR)) {
      this.popScope()
      return Promise.resolve()
    }
    this.assert({ [TOKEN_TYPE.KEYWORD]: KEYWORDS.VAR })
    await this.compileType()
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
    this.popScope()
    await this.compileVarDec()
  }

  /**
   * Compiles a sequence of statements, not including the enclosing "{}".
   * `statement*`
   */
  async compileStatements () {
    this.pushScope('compile statements')
    await this.pause()
    const validKeywords = [
      KEYWORDS.LET, KEYWORDS.IF, KEYWORDS.WHILE, KEYWORDS.DO, KEYWORDS.RETURN
    ]
    if (!this.lookAhead(validKeywords)) {
      this.popScope()
      return Promise.resolve()
    }

    while (true) {
      this.tokenizer.advance()
      const value = this.tokenizer.tokenValue()
      this.tokenizer.back()
      if (!validKeywords.includes(value)) break
      // eslint-disable-next-line
      switch (value) {
        case KEYWORDS.LET:
          await this.compileLet()
          break
        case KEYWORDS.IF:
          await this.compileIf()
          break
        case KEYWORDS.WHILE:
          await this.compileWhile()
          break
        case KEYWORDS.DO:
          await this.compileDo()
          break
        case KEYWORDS.RETURN:
          await this.compileReturn()
          break
      }
    }

    this.popScope()
  }

  /**
   * Compiles a `do` statement
   * `'do' subroutineCall ';'`
   */
  async compileDo () {
    this.pushScope('compile do')
    await this.pause()
    this.assert({ [TOKEN_TYPE.KEYWORD]: KEYWORDS.DO })
    await this.compileSubroutineCall()
    this.assert({ [TOKEN_TYPE.SYMBOL]: ';' })
    this.vmWriter.writePop(SEGMENTS.TEMP, 0)
    this.popScope()
  }

  /**
   * Compiles a subroutine call
   * `subroutineName '(' expressionList ')' | (className | varName) '.' subroutineName '(' expressionList ')'`
   */
  async compileSubroutineCall () {
    this.pushScope('compile subroutine call')
    await this.pause()
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
    nArgs += await this.compileExpressionList()
    this.assert({ [TOKEN_TYPE.SYMBOL]: ')' })

    // If it is a method call the object reference the method suppposed to
    // operate must be passed as a first argument, so nArgs should be increment by 1
    this.vmWriter.writeCall(subroutineName, isMethodCall ? nArgs + 1 : nArgs)
    this.popScope()
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
  async compileLet () {
    this.pushScope('compile let')
    await this.pause()
    this.assert({ [TOKEN_TYPE.KEYWORD]: KEYWORDS.LET })
    this.assert({ [TOKEN_TYPE.IDENTIFIER]: null })
    const identifier = this.tokenizer.tokenValue()
    this.tokenizer.advance()
    const value = this.tokenizer.tokenValue()
    let isVariableArray = false
    if (value === '[') {
      isVariableArray = true
      await this.compileExpression()
      this.assert({ [TOKEN_TYPE.SYMBOL]: ']' })
      this.compileArrayVariable(identifier)
    } else this.tokenizer.back()

    this.assert({ [TOKEN_TYPE.SYMBOL]: '=' })
    await this.compileExpression()
    this.assert({ [TOKEN_TYPE.SYMBOL]: ';' })
    this.compileLetAssignment(isVariableArray, identifier)
    this.popScope()
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
  async compileWhile () {
    this.pushScope('compile while')
    await this.pause()
    ++this.whileCounter
    const startLabel = this.whileStartLabel + this.whileCounter
    const endLabel = this.whileEndLabel + this.whileCounter
    this.vmWriter.writeLabel(startLabel)

    this.assert({ [TOKEN_TYPE.KEYWORD]: KEYWORDS.WHILE })
    this.assert({ [TOKEN_TYPE.SYMBOL]: '(' })
    await this.compileExpression()
    this.assert({ [TOKEN_TYPE.SYMBOL]: ')' })

    this.vmWriter.writeArithmetic(COMMANDS.NOT)
    this.vmWriter.writeIf(endLabel)

    this.assert({ [TOKEN_TYPE.SYMBOL]: '{' })
    this.compileStatements()
    this.assert({ [TOKEN_TYPE.SYMBOL]: '}' })

    this.vmWriter.writeGoto(startLabel)
    this.vmWriter.writeLabel(endLabel)
    this.popScope()
  }

  /**
   * Compiles a `return` statement
   * `'return' expression? ';'`
   */
  async compileReturn () {
    this.pushScope('compile return')
    await this.pause()
    this.assert({ [TOKEN_TYPE.KEYWORD]: KEYWORDS.RETURN })
    this.tokenizer.advance()
    const value = this.tokenizer.tokenValue()
    if (value !== ';') {
      this.tokenizer.back()
      await this.compileExpression()
      this.assert({ [TOKEN_TYPE.SYMBOL]: ';' })
    } else this.vmWriter.writePush(SEGMENTS.CONSTANT, 0)
    this.vmWriter.writeReturn()
    this.popScope()
  }

  /**
   * Compiles an `if` statement, possibly with a trailing `else` clause
   * `'if' '(' expression ')' '{' statements '}' ('else' '{' statements '}')?`
   */
  async compileIf () {
    this.pushScope('compile if')
    await this.pause()
    ++this.ifCounter
    const trueLabel = this.ifTrueLabel + this.ifCounter
    const falseLabel = this.ifFalseLabel + this.ifCounter
    const endLabel = this.ifEndLabel + this.ifCounter

    this.assert({ [TOKEN_TYPE.KEYWORD]: KEYWORDS.IF })
    this.assert({ [TOKEN_TYPE.SYMBOL]: '(' })
    await this.compileExpression()
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
    this.popScope()
  }

  /**
   * Compiles an expression
   */
  async compileExpression () {
    this.pushScope('compile expression')
    await this.pause()
    await this.compileTerm()
    while (true) {
      this.tokenizer.advance()
      const value = this.tokenizer.tokenValue()
      if (!OPERATORS.includes(value)) {
        this.tokenizer.back()
        break
      }
      await this.compileTerm()
      this.vmWriter.writeArithmetic(VM_BINARY_COMMANDS_MAPPING[value])
    }
    this.popScope()
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
  async compileTerm () {
    this.pushScope('compile term')
    await this.pause()
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
          await this.compileExpression()
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
          await this.compileSubroutineCall()
        } else if (this.lookAhead('[')) {
          const identifier = tokenizer.tokenValue()
          // array call
          this.assert({ [TOKEN_TYPE.SYMBOL]: '[' })
          await this.compileExpression()
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
    this.popScope()
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
    // eslint-disable-next-line
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
  async compileExpressionList () {
    this.pushScope('compile expression list')
    await this.pause()
    let nArgs = 0
    const isExpressionEnd = this.lookAhead(')')
    if (isExpressionEnd) {
      this.popScope()
      return nArgs
    }
    while (true) {
      await this.compileExpression()
      nArgs++
      this.tokenizer.advance()
      const value = this.tokenizer.tokenValue()
      if (value !== ',') {
        this.tokenizer.back()
        break
      }
    }

    this.popScope()
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
