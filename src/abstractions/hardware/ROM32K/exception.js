/**
 * Error encountered while setting/retrieving memory values
 */
class ROMException extends Error {
  constructor (message) {
    super(`ROM Exception, ${message}`)
  }
}

export default ROMException
