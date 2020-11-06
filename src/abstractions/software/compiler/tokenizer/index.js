import JackToken from './JackToken'
import { removeComments, SPECIAL_SYMBOLS } from './utils'
import { TOKEN_REGEX } from './utils/regex'
import { TOKEN_TYPE } from './types'
import TokenException from './TokenException'

class JackTokenizer {
  constructor (jackCode) {
    /** @type {JackToken[]} */
    this.tokens = []
    this.currentTokenIndex = -1
    /** @type {JackToken} */
    this.currentToken = null
    // Split the jack code into JackTokens
    this.extractTokens(removeComments(jackCode))
  }

  // It resets the current token
  reset () {
    this.currentTokenIndex = -1
    this.currentToken = null
  }

  /**
   * @param {string} jackCode comments removed jack code
   * @returns {JackToken[]} array of `JackToken`
   */
  extractTokens (jackCode) {
    const matches = jackCode.matchAll(TOKEN_REGEX)

    for (const match of matches) {
      const [token] = match
      this.tokens.push(
        new JackToken(token, this.getTokenTypeByRegexCapture(match))
      )
    }
  }

  /**
   * The regex group which captured the token, can also be used as a token type.
   * Like if a token is captured by the first group, its token type will be `KEYWORD`
   * @param {Object} match match
   * eg, ["Main", undefined, undefined, undefined, undefined, "Main"]
   * The first element is the matched token and the others are captured groups.
   * So for this case the matched token is `Main` and its group is an identifier,
   * from the regex order.
   */
  getTokenTypeByRegexCapture (match) {
    const [
      , isKeyword, isSymbol, isIntegerConstant, isStringConstant, isIdentifier
    ] = match
    if (isKeyword) return TOKEN_TYPE.KEYWORD
    if (isSymbol) return TOKEN_TYPE.SYMBOL
    if (isIntegerConstant) return TOKEN_TYPE.INTEGER_CONSTANT
    if (isStringConstant) return TOKEN_TYPE.STRING_CONSTANT
    if (isIdentifier) return TOKEN_TYPE.IDENTIFIER
  }

  /**
   * Do we have more tokens in the input?
   */
  hasMoreTokens () {
    return this.currentTokenIndex + 1 < this.tokens.length
  }

  /**
   * Get the next token from the input and makes it the current token.
   * This method should only be called if `hasMoreTokens()` is `true`.
   * Initially there is no current token.
   * If there are no more tokens, the current token will reset to `null`.
   */
  advance () {
    if (!this.hasMoreTokens()) return (this.currentToken = null)
    this.currentToken = this.tokens[++this.currentTokenIndex]
  }

  /**
   * Restores last current token
   */
  back () {
    this.currentToken = this.tokens[--this.currentTokenIndex]
  }

  /**
   * @returns {TOKEN_TYPE} the type of the current token
   */
  tokenType () {
    return this.currentToken.type()
  }

  // returns the current token value
  tokenValue () {
    return this.currentToken.value()
  }

  /**
   * @returns {string} the keyword which is the current token.
   * Should be called only when `tokenType` is `KEYWORD`.
   * @throws {TokenException} if `keyword` is called with token type other than `KEYWORD`.
   */
  keyword () {
    this.errorMiddleware(TOKEN_TYPE.KEYWORD)
    return this.currentToken.value()
  }

  /**
   * @returns {string} the symbol which is the current token.
   * Should be called only when `tokenType` is `SYMBOL`.
   * @throws {TokenException} if `symbol` is called with token type other than `SYMBOL`.
   */
  symbol () {
    this.errorMiddleware(TOKEN_TYPE.SYMBOL)
    const tokenValue = this.currentToken.value()
    const specialSymbol = SPECIAL_SYMBOLS[tokenValue]
    return specialSymbol || this.currentToken.value()
  }

  /**
   * @returns {string} the identifier which is the current token.
   * Should be called only when `tokenType` is `IDENTIFIER`.
   * @throws {TokenException} if `identifier` is called with token type other than `IDENTIFIER`.
   */
  identifier () {
    this.errorMiddleware(TOKEN_TYPE.IDENTIFIER)
    return this.currentToken.value()
  }

  /**
   * @returns {string} the integer value of the current token.
   * Should be called only when `tokenType` is `INTEGER_CONSTANT`.
   * @throws {TokenException} if `intVal` is called with token type other than `INTEGER_CONSTANT`.
   */
  intVal () {
    this.errorMiddleware(TOKEN_TYPE.INTEGER_CONSTANT)
    return parseInt(this.currentToken.value())
  }

  /**
   * @returns {string} the string which is the current token, without the double quotes.
   * Should be called only when `tokenType` is `STRING_CONSTANT`.
   * @throws {TokenException} if `stringVal` is called with token type other than `STRING_CONSTANT`.
   */
  stringVal () {
    this.errorMiddleware(TOKEN_TYPE.STRING_CONSTANT)
    const value = this.currentToken.value()
    return value.substring(1, value.length - 1)
  }

  /**
   * If the given token type is not equal with the current token type,
   * it will throw a `TokenException` error.
   * @param {TOKEN_TYPE} tokenType token type we want to check with the current token type.
   * @throws {TokenException} if given token type is not equal with the curren token type.
   */
  errorMiddleware (tokenType) {
    const currentTokenType = this.currentToken.type()
    if (tokenType === currentTokenType) return
    throw new TokenException(
      `\`${tokenType}()\` should be called only when tokenType is \`${tokenType.toUpperCase()}\`,
      but it is called with token type: ${currentTokenType.toUpperCase()}.`
    )
  }
}

export default JackTokenizer
