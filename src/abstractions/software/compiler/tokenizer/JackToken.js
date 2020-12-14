// eslint-disable-next-line
import { TOKEN_TYPE } from './types'

class JackToken {
  constructor (token, type, position) {
    this.token = token
    /** @type {TOKEN_TYPE} */
    this.tokenType = type
    this.position = position
  }

  /**
   * @returns {string} the current token value
   */
  value () {
    return this.token
  }

  /**
   * @returns {TOKEN_TYPE} the type of the current token
   */
  type () {
    return this.tokenType
  }

  index () {
    return this.position
  }
}

export default JackToken
