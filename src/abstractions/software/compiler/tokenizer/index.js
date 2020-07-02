import JackToken from './JackToken'
import { removeComments, SPECIAL_SYMBOLS } from './utils'
import {
  TOKEN_REGEX,
  KEYWORD_REGEX,
  SYMBOL_REGEX,
  INTEGER_CONSTANT_REGEX,
  STRING_CONSTANT_REGEX,
  IDENTIFIER_REGEX
} from './utils/regex'
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

  /**
   * @param {string} jackCode comments removed jack code
   * @returns {JackToken[]} array of `JackToken`
   */
  extractTokens (jackCode) {
    const tokens = jackCode.match(TOKEN_REGEX)
    tokens.forEach(token => {
      this.tokens.push(
        new JackToken(token, this.getTokenTypeByRegexCheck(token))
      )
    })
  }

  /**
   * The regex group which captured the token, can also be used as a token type.
   * Like if a token is captured by the first group, its token type will be `KEYWORD`
   * @param {Object} token token
   */
  getTokenTypeByRegexCapture (token) {
    const {
      value: [
        , isKeyword, isSymbol, isIntegerConstant, isStringConstant, isIdentifier
      ]
    } = token
    if (isKeyword) return TOKEN_TYPE.KEYWORD
    if (isSymbol) return TOKEN_TYPE.SYMBOL
    if (isIntegerConstant) return TOKEN_TYPE.INTEGER_CONSTANT
    if (isStringConstant) return TOKEN_TYPE.STRING_CONSTANT
    if (isIdentifier) return TOKEN_TYPE.IDENTIFIER
  }

  /**
   * This is an extra work to get the token type of a token.
   * We can directly know the token type from the regex capture group.
   * I don't know why calling `matchAll` function in `string` class throws
   * `matchAll` is not a function error but working on browser console.
   * @param {string} tokenValue token value
   */
  getTokenTypeByRegexCheck (tokenValue) {
    if (KEYWORD_REGEX.test(tokenValue)) return TOKEN_TYPE.KEYWORD
    if (SYMBOL_REGEX.test(tokenValue)) return TOKEN_TYPE.SYMBOL
    if (
      INTEGER_CONSTANT_REGEX.test(tokenValue)
    ) return TOKEN_TYPE.INTEGER_CONSTANT
    if (
      STRING_CONSTANT_REGEX.test(tokenValue)
    ) return TOKEN_TYPE.STRING_CONSTANT
    if (IDENTIFIER_REGEX.test(tokenValue)) return TOKEN_TYPE.IDENTIFIER
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
   * @returns {TOKEN_TYPE} the type of the current token
   */
  tokenType () {
    return this.currentToken.type()
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
