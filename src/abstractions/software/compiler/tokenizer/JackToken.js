// eslint-disable-next-line
import { TOKEN_TYPE } from './types'

class JackToken {
  constructor (token, type) {
    this.token = token
    /** @type {TOKEN_TYPE} */
    this.tokenType = type
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
}

export default JackToken
