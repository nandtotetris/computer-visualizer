// eslint-disable-next-line
import { SEGMENTS, COMMANDS } from './types'

class VMWriter {
  constructor (props) {
    this.initializeVM()
  }

  reset () {
    this.initializeVM()
  }

  initializeVM () {
    this.vm = ''
  }

  /**
   * Writes a VM `push` command.
   * eg. `push argument 0`, segment is `argument` and index is `0`.
   * @param {SEGMENTS} segment hack memory segment
   * @param {number} index index
   */
  writePush (segment, index) {
    this.vm += `push ${segment} ${index}\n`
  }

  /**
   * Writes a VM `pop` command.
   * eg. `pop local 2`,
   * segment is `local` and index is `2`.
   * @param {SEGMENTS} segment hack memory segment
   * @param {number} index index
   */
  writePop (segment, index) {
    this.vm += `pop ${segment} ${index}\n`
  }

  /**
   * Writes a VM `arithmetic` command.
   * @param {COMMANDS} command command
   */
  writeArithmetic (command) {
    this.vm += `${command}\n`
  }

  /**
   * Writes a VM `label` command.
   * @param {string} label label
   */
  writeLabel (label) {
    this.vm += `label ${label}\n`
  }

  /**
   * Writes a VM `goto` command.
   * @param {string} label label
   */
  writeGoto (label) {
    this.vm += `goto ${label}\n`
  }

  /**
   * Writes a VM `if-goto` command.
   * @param {string} label label
   */
  writeIf (label) {
    this.vm += `if-goto ${label}\n`
  }

  /**
   * Writes a VM `call` command.
   * @param {string} name function name we want to call
   * @param {number} nArgs  number of arguments we want to pass to
   * the called function
   */
  writeCall (name, nArgs) {
    this.vm += `call ${name} ${nArgs}\n`
  }

  /**
   * Writes a VM `function` command.
   * @param {string} name function name
   * @param {number} nLocals number of local variables the function have.
   */
  writeFunction (name, nLocals) {
    this.vm += `function ${name} ${nLocals}\n`
  }

  /**
   * Writes a VM `return` command.
   */
  writeReturn () {
    this.vm += 'return\n'
  }

  getVM () {
    return this.vm.trim()
  }
}

export default VMWriter
