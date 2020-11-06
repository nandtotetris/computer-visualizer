/**
 * Error encountered while processing a given line/command
 */
class ParserException extends Error {
  constructor (message, lineNumber) {
    super(`${lineNumber ? `In line ${lineNumber}: ` : ''}${message}`)
  }
}

export default ParserException
