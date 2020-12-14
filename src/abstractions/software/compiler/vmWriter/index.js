// eslint-disable-next-line
import { SEGMENTS, COMMANDS } from './types'

class VMWriter {
  constructor (props) {
    this.observers = []
    this.initializeVM()
  }

  subscribe (observer) {
    this.observers.push(observer)
    const index = this.observers.indexOf(observer)
    return () => this.observers.splice(index, 1)
  }

  notify (data) {
    this.observers.forEach(observer => observer(data))
  }

  reset () {
    this.initializeVM()
    this.notify(this.vm)
  }

  initializeVM () {
    this.vm = ''
  }

  writeVM (vm) {
    this.vm += `${vm}\n`
    this.notify(this.vm)
  }

  /**
   * Writes a VM `push` command.
   * eg. `push argument 0`, segment is `argument` and index is `0`.
   * @param {SEGMENTS} segment hack memory segment
   * @param {number} index index
   */
  writePush (segment, index) {
    this.writeVM(`push ${segment} ${index}`)
  }

  /**
   * Writes a VM `pop` command.
   * eg. `pop local 2`,
   * segment is `local` and index is `2`.
   * @param {SEGMENTS} segment hack memory segment
   * @param {number} index index
   */
  writePop (segment, index) {
    this.writeVM(`pop ${segment} ${index}`)
  }

  /**
   * Writes a VM `arithmetic` command.
   * @param {COMMANDS} command command
   */
  writeArithmetic (command) {
    this.writeVM(`${command}`)
  }

  /**
   * Writes a VM `label` command.
   * @param {string} label label
   */
  writeLabel (label) {
    this.writeVM(`label ${label}`)
  }

  /**
   * Writes a VM `goto` command.
   * @param {string} label label
   */
  writeGoto (label) {
    this.writeVM(`goto ${label}`)
  }

  /**
   * Writes a VM `if-goto` command.
   * @param {string} label label
   */
  writeIf (label) {
    this.writeVM(`if-goto ${label}`)
  }

  /**
   * Writes a VM `call` command.
   * @param {string} name function name we want to call
   * @param {number} nArgs  number of arguments we want to pass to
   * the called function
   */
  writeCall (name, nArgs) {
    this.writeVM(`call ${name} ${nArgs}`)
  }

  /**
   * Writes a VM `function` command.
   * @param {string} name function name
   * @param {number} nLocals number of local variables the function have.
   */
  writeFunction (name, nLocals) {
    this.writeVM(`function ${name} ${nLocals}`)
  }

  /**
   * Writes a VM `return` command.
   */
  writeReturn () {
    this.writeVM('return')
  }

  getVM () {
    return this.vm.trim()
  }
}

export default VMWriter
