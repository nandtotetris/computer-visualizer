/**
 * Error encountered while processing a given line/command
 */
class TokenException extends Error {
  constructor (message, lineNumber) {
    super(`${lineNumber ? `In line ${lineNumber}: ` : ''}${message}`)
  }
}

export default TokenException
