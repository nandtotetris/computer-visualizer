import JackTokenizer from '../tokenizer'
import ParserException from './parserException'
import { KEYWORDS } from '../tokenizer/utils/regex'
import { TOKEN_TYPE } from '../tokenizer/types'
// eslint-disable-next-line
import Writer from '../writer'
import { convertToArray, OPERATORS, UNARY_OPERATORS } from './utils'

class CompilationEngine {
  /**
    * @param {string} jackCode jack code
    * @param {Writer} writer writer
  */
  constructor (jackCode, writer) {
    this.tokenizer = new JackTokenizer(jackCode)
    this.writer = writer
  }

  /**
   * Compiles a complete class
   * `class className { classVarDec* subroutineDec* }`
   */
  compileClass () {
    const { tokenizer, writer } = this
    if (!tokenizer.hasMoreTokens()) return
    tokenizer.advance()

    this.errorMiddleware({ [TOKEN_TYPE.KEYWORD]: KEYWORDS.CLASS })
    writer.writeStart(KEYWORDS.CLASS)
    this.write()

    this.assertAndWrite({ [TOKEN_TYPE.IDENTIFIER]: null })

    this.assertAndWrite({ [TOKEN_TYPE.SYMBOL]: '{' })

    this.compileClassVarDec()
    this.compileSubroutine()

    this.assertAndWrite({ [TOKEN_TYPE.SYMBOL]: '}' })
    writer.writeEnd(KEYWORDS.CLASS)
    // check if there is an extra token
    if (tokenizer.hasMoreTokens()) {
      tokenizer.advance()
      throw new ParserException(`Found an extra token '${tokenizer.tokenValue()}'`)
    }
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
    this.writer.writeStart('classVarDec')
    this.write()

    this.compileType()

    while (true) {
      this.assertAndWrite({ [TOKEN_TYPE.IDENTIFIER]: null })

      tokenizer.advance()
      if (tokenizer.tokenValue() !== ',') {
        tokenizer.back()
        break
      }
      this.write()
    }
    this.assertAndWrite({ [TOKEN_TYPE.SYMBOL]: ';' })
    this.writer.writeEnd('classVarDec')

    this.compileClassVarDec()
  }

  /**
   * Compiles a type
   * `'int' | 'char' | 'boolean' | className(identifier)`
   */
  compileType () {
    this.assertAndWrite({
      [TOKEN_TYPE.KEYWORD]: [KEYWORDS.INT, KEYWORDS.CHAR, KEYWORDS.BOOLEAN],
      [TOKEN_TYPE.IDENTIFIER]: null
    })
  }

  /**
   * Compiles a complete method, function, or constructor.
   * `(constructor | function | method) (void | type) subroutineName '('parameterList ')' subroutineBody`
   */
  compileSubroutine () {
    const { tokenizer, writer } = this
    tokenizer.advance()
    const validKeywords = [KEYWORDS.CONSTRUCTOR, KEYWORDS.FUNCTION, KEYWORDS.METHOD]
    if (
      !validKeywords.includes(tokenizer.tokenValue())
    ) return tokenizer.back()
    writer.writeStart('subroutineDec')
    this.write()

    tokenizer.advance()
    const value = tokenizer.tokenValue()
    if (value === KEYWORDS.VOID) this.write()
    else {
      tokenizer.back()
      this.compileType()
    }

    this.assertAndWrite({ [TOKEN_TYPE.IDENTIFIER]: null })

    this.assertAndWrite({ [TOKEN_TYPE.SYMBOL]: '(' })

    this.compileParameterList()

    this.assertAndWrite({ [TOKEN_TYPE.SYMBOL]: ')' })

    this.compileSubroutineBody()
    writer.writeEnd('subroutineDec')
    this.compileSubroutine()
  }

  /**
   * Compiles a subroutine body
   * `'{' varDec* statements '}'`
   */
  compileSubroutineBody () {
    this.writer.writeStart('subroutineBody')
    this.assertAndWrite({ [TOKEN_TYPE.SYMBOL]: '{' })
    this.compileVarDec()
    this.compileStatements()
    this.assertAndWrite({ [TOKEN_TYPE.SYMBOL]: '}' })
    this.writer.writeEnd('subroutineBody')
  }

  assertAndWrite (expectedTypesandValues) {
    this.tokenizer.advance()
    this.errorMiddleware(expectedTypesandValues)
    this.write()
  }

  /**
   * Compiles a (possible empty) parameter list, not including
   * the enclosing '()'.
   * `((type varName) (',' type varName)*)?`
   */
  compileParameterList () {
    const { tokenizer } = this
    this.writer.writeStart('parameterList')
    const isParameterEnd = this.lookAhead(')')
    if (isParameterEnd) return this.writer.writeEnd('parameterList')

    while (true) {
      this.compileType()
      this.assertAndWrite({ [TOKEN_TYPE.IDENTIFIER]: null })
      tokenizer.advance()
      if (tokenizer.tokenValue() !== ',') {
        tokenizer.back()
        break
      }
      this.write()
    }
    this.writer.writeEnd('parameterList')
  }

  /**
   * Compiles a var declaration
   * `'var' type varName(',' varName)* ';'`
   */
  compileVarDec () {
    if (!this.lookAhead(KEYWORDS.VAR)) return

    this.writer.writeStart('varDec')
    this.assertAndWrite({ [TOKEN_TYPE.KEYWORD]: KEYWORDS.VAR })
    this.compileType()
    while (true) {
      this.assertAndWrite({ [TOKEN_TYPE.IDENTIFIER]: null })
      this.tokenizer.advance()
      if (this.tokenizer.tokenValue() !== ',') {
        this.tokenizer.back()
        break
      }
      this.write()
    }
    this.assertAndWrite({ [TOKEN_TYPE.SYMBOL]: ';' })
    this.writer.writeEnd('varDec')
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
    this.writer.writeStart('statements')

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

    this.writer.writeEnd('statements')
  }

  /**
   * Compiles a `do` statement
   * `'do' subroutineCall ';'`
   */
  compileDo () {
    this.writer.writeStart('doStatement')
    this.assertAndWrite({ [TOKEN_TYPE.KEYWORD]: KEYWORDS.DO })
    this.compileSubroutineCall()
    this.assertAndWrite({ [TOKEN_TYPE.SYMBOL]: ';' })
    this.writer.writeEnd('doStatement')
  }

  /**
   * Compiles a subroutine call
   * `subroutineName '(' expressionList ')' | (className | varName) '.' subroutineName '(' expressionList ')'`
   */
  compileSubroutineCall () {
    this.assertAndWrite({ [TOKEN_TYPE.IDENTIFIER]: null })
    this.tokenizer.advance()
    const value = this.tokenizer.tokenValue()
    // method call
    if (value === '.') {
      this.write()
      this.assertAndWrite({ [TOKEN_TYPE.IDENTIFIER]: null })
    } else this.tokenizer.back()
    this.assertAndWrite({ [TOKEN_TYPE.SYMBOL]: '(' })
    this.compileExpressionList()
    this.assertAndWrite({ [TOKEN_TYPE.SYMBOL]: ')' })
  }

  /**
   * Compiles a `let` statement
   * `'let' varName ('[' expression ']')? '=' expression ';'`
   */
  compileLet () {
    this.writer.writeStart('letStatement')
    this.assertAndWrite({ [TOKEN_TYPE.KEYWORD]: KEYWORDS.LET })
    this.assertAndWrite({ [TOKEN_TYPE.IDENTIFIER]: null })
    this.tokenizer.advance()
    const value = this.tokenizer.tokenValue()
    if (value === '[') {
      this.write()
      this.compileExpression()
      this.assertAndWrite({ [TOKEN_TYPE.SYMBOL]: ']' })
    } else this.tokenizer.back()

    this.assertAndWrite({ [TOKEN_TYPE.SYMBOL]: '=' })
    this.compileExpression()
    this.assertAndWrite({ [TOKEN_TYPE.SYMBOL]: ';' })
    this.writer.writeEnd('letStatement')
  }

  /**
   * Compiles a `while` statement
   * `'while' '(' expression ')' '{' statements '}'`
   */
  compileWhile () {
    this.writer.writeStart('whileStatement')
    this.assertAndWrite({ [TOKEN_TYPE.KEYWORD]: KEYWORDS.WHILE })
    this.assertAndWrite({ [TOKEN_TYPE.SYMBOL]: '(' })
    this.compileExpression()
    this.assertAndWrite({ [TOKEN_TYPE.SYMBOL]: ')' })
    this.assertAndWrite({ [TOKEN_TYPE.SYMBOL]: '{' })
    this.compileStatements()
    this.assertAndWrite({ [TOKEN_TYPE.SYMBOL]: '}' })
    this.writer.writeEnd('whileStatement')
  }

  /**
   * Compiles a `return` statement
   * `'return' expression? ';'`
   */
  compileReturn () {
    this.writer.writeStart('returnStatement')
    this.assertAndWrite({ [TOKEN_TYPE.KEYWORD]: KEYWORDS.RETURN })
    this.tokenizer.advance()
    const value = this.tokenizer.tokenValue()
    if (value !== ';') {
      this.tokenizer.back()
      this.compileExpression()
      this.assertAndWrite({ [TOKEN_TYPE.SYMBOL]: ';' })
    } else this.write()
    this.writer.writeEnd('returnStatement')
  }

  /**
   * Compiles an `if` statement, possibly with a trailing `else` clause
   * `'if' '(' expression ')' '{' statements '}' ('else' '{' statements '}')?`
   */
  compileIf () {
    this.writer.writeStart('ifStatement')
    this.assertAndWrite({ [TOKEN_TYPE.KEYWORD]: KEYWORDS.IF })
    this.assertAndWrite({ [TOKEN_TYPE.SYMBOL]: '(' })
    this.compileExpression()
    this.assertAndWrite({ [TOKEN_TYPE.SYMBOL]: ')' })
    this.assertAndWrite({ [TOKEN_TYPE.SYMBOL]: '{' })
    this.compileStatements()
    this.assertAndWrite({ [TOKEN_TYPE.SYMBOL]: '}' })
    this.tokenizer.advance()
    const value = this.tokenizer.tokenValue()
    if (value === KEYWORDS.ELSE) {
      this.write()
      this.assertAndWrite({ [TOKEN_TYPE.SYMBOL]: '{' })
      this.compileStatements()
      this.assertAndWrite({ [TOKEN_TYPE.SYMBOL]: '}' })
    } else this.tokenizer.back()
    this.writer.writeEnd('ifStatement')
  }

  /**
   * Compiles an expression
   */
  compileExpression () {
    this.writer.writeStart('expression')
    while (true) {
      this.compileTerm()
      this.tokenizer.advance()
      const value = this.tokenizer.tokenValue()
      if (!OPERATORS.includes(value)) {
        this.tokenizer.back()
        break
      }
      this.writer.write(this.tokenizer.symbol(), this.tokenizer.tokenType())
    }
    this.writer.writeEnd('expression')
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
    const { writer, tokenizer } = this
    this.writer.writeStart('term')
    tokenizer.advance()
    const type = tokenizer.tokenType()

    switch (type) {
      case TOKEN_TYPE.INTEGER_CONSTANT:
        writer.write(tokenizer.intVal(), type)
        break
      case TOKEN_TYPE.STRING_CONSTANT:
        writer.write(tokenizer.stringVal(), type)
        break
      case TOKEN_TYPE.KEYWORD:
        tokenizer.back()
        this.assertAndWrite({
          [TOKEN_TYPE.KEYWORD]: [
            KEYWORDS.TRUE, KEYWORDS.FALSE, KEYWORDS.NULL, KEYWORDS.THIS
          ]
        })
        break
      case TOKEN_TYPE.SYMBOL: {
        const tokenValue = tokenizer.tokenValue()
        if (tokenValue === '(') {
          this.write()
          this.compileExpression()
          this.assertAndWrite({ [TOKEN_TYPE.SYMBOL]: ')' })
        } else if (UNARY_OPERATORS.includes(tokenValue)) {
          this.write()
          this.compileTerm()
        } else {
          throw new ParserException(
            `Expected '(' OR '-, ~' but found ${type.toUpperCase()} '${tokenValue}'`
          )
        }
      }
        break
      case TOKEN_TYPE.IDENTIFIER:
        // is function/method call
        if (this.lookAhead('.') || this.lookAhead('(')) {
          tokenizer.back()
          this.compileSubroutineCall()
        } else if (this.lookAhead('[')) {
          // array call
          this.write()
          this.assertAndWrite({ [TOKEN_TYPE.SYMBOL]: '[' })
          this.compileExpression()
          this.assertAndWrite({ [TOKEN_TYPE.SYMBOL]: ']' })
        } else this.write()
        break
      default: {
        const tokenTypes = [TOKEN_TYPE.INTEGER_CONSTANT, TOKEN_TYPE.STRING_CONSTANT, TOKEN_TYPE.IDENTIFIER]
        const msg = `${tokenTypes.map(t => t.toUpperCase()).join(' | ')} | 'true, false, null, this' |
        'varName[expression]' | 'subroutineCall' | '(expression)' | '-, ~'`
        throw new ParserException(`Expected ${msg} but found ${type.toUpperCase()} ${tokenizer.tokenValue()}`)
      }
    }

    this.writer.writeEnd('term')
  }

  /**
   * Compiles a (possibly empty) comma-separated list of expressions.
   * `(expression (',' expression)*)?`
   */
  compileExpressionList () {
    this.writer.writeStart('expressionList')
    const isExpressionEnd = this.lookAhead(')')
    if (isExpressionEnd) return this.writer.writeEnd('expressionList')
    while (true) {
      this.compileExpression()
      this.tokenizer.advance()
      const value = this.tokenizer.tokenValue()
      if (value !== ',') {
        this.tokenizer.back()
        break
      }
      this.write()
    }
    this.writer.writeEnd('expressionList')
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
   * Writes the current token value and type to xml file
   */
  write () {
    this.writer.write(this.tokenizer.tokenValue(), this.tokenizer.tokenType())
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
