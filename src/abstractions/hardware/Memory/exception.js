/**
 * Error encountered while setting/retrieving memory values
 */
class MemoroyException extends Error {
  constructor (message) {
    super(`Memory Exception, ${message}`)
  }
}

export default MemoroyException
