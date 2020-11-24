/**
 * Error encountered while processing a given line/command
 */
class ROMException extends Error {
  constructor (message) {
    super(`ROM Exception, ${message}`)
  }
}

export default ROMException
