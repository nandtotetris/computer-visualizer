import {
  isArithmeticCommand,
  isCommandType,
  isSegmentName,
  doTypesMatch
} from '../utils'
import { COMMAND } from './types'
import CommandException from './exception'

/**
 * This class represents a single HVM (Hack Virtual Machine) command
 */
class HVMCommand {
  /**
   * Constructs a new HVM command
   * @param {COMMAND} commandType the HVM command's type
   * @param {string} arg1 segment, function, or label name
   * @param {number} arg2 second argument of the command
   * - segment index for push/pull commands,
   * - function's number of argument for call command,
   * - or function's number of local variables for function
   * declaration command
   * @throws {CommandException} if `commandType` is not provided,
   * or is of invalid type
   */
  constructor (commandType, arg1, arg2) {
    if (!commandType) {
      throw new CommandException(
        'cannot create HVM' +
        'command without providing a command type')
    }
    if (!isCommandType(commandType)) {
      throw new CommandException(
        'cannot create HVM command with an invalid command type: ' +
        `${commandType}`)
    }

    /**
     * The HVM command's type
     * @type {COMMAND}
     */
    this.commandType = commandType

    /**
     * segment, function, or label name
     * @type {string}
     */
    this.arg1 = undefined
    if (arg1 !== undefined) this.setArg1(arg1)

    /**
     * - segment index for push/pull commands,
     * - function's number of argument for call command,
     * - or function's number of local variables for
     * function declaration command
     * @type {number}
     */
    this.arg2 = undefined
    if (arg2 !== undefined) this.setArg2(arg2)

    /**
     * Additional info for the command, for example `className` for push/pull
     * commands when the segment name is `static`
     * @type {string}
     */
    this.stringArg = ''

    /**
     * Number of arguments (arg1 plus arg2). So for example if both arg1
     * and arg2 are set, number of arguments is set to 2
     * @type {number}
     */
    this.numberOfArgs = 0

    // calculate and update number of arguments
    this.updateNumberOfArgs()
  }

  /**
   * Set arg1 of the HVM command, which can be one of the following:
   * - segment name for push/pop commands
   * - function name for function/call commands
   * - label name for label and goto/if-goto commands
   * @param {string} arg1 first argument of HVM command
   * @throws {CommandException} if setting arg1 doesn't make sense
   */
  setArg1 (arg1) {
    if (!doTypesMatch('local', arg1)) {
      throw new CommandException(
        "arg1 should be of type 'string', " +
        ` but has type '${typeof arg1}'`)
    }
    if (this.commandType === COMMAND.RETURN) {
      throw new CommandException(
        'cannot set arg1 to a return command')
    }
    if (isArithmeticCommand(this.commandType)) {
      throw new CommandException(
        'cannot set arg1 to an arithmetic command')
    }
    if ([COMMAND.PUSH, COMMAND.POP].includes(this.commandType) &&
      !isSegmentName(arg1)) {
      throw new CommandException(
        `invalid segment name: ${arg1} to a ${this.commandType} command`)
    }
    this.arg1 = arg1
    this.updateNumberOfArgs()
  }

  /**
   * Set arg2 of the HVM command, arg2 can be one of the following:
   * - segment index for push/pop commands
   * - number of arguments for call command
   * - number of local variables for function command
   * @param {number} arg2 arg2 of HVM command
   * @throws {CommandException} if setting arg2 doesn't make sense
   */
  setArg2 (arg2) {
    if (!doTypesMatch(2, arg2)) {
      throw new CommandException(
        "arg1 should be of type 'number', " +
        ` but has type '${typeof arg2}'`)
    }
    if (!this.isArg2Relevant(this.commandType)) {
      throw new CommandException(
        `cannot set arg2 to the ${this.commandType} command`)
    }
    if ([COMMAND.POP, COMMAND.PUSH].includes(this.commandType)) {
      if (arg2 < 0) {
        throw new CommandException(`negative segment index: ${arg2}`)
      }
    }
    this.arg2 = arg2
    this.updateNumberOfArgs()
  }

  /**
   * Additional info for the command, for example `className` for push/pull
   * commands when the segment name is `static`
   * @param {string} stringArg the stringArg of the HVM command
   */
  setStringArg (stringArg) {
    this.stringArg = stringArg
  }

  /**
   * Sets number of arguments to 2 if both arg1 and arg2
   * are present, to 1 if either is missing, to 0 if both
   * are not set
   */
  updateNumberOfArgs () {
    this.numberOfArgs = [this.arg1, this.arg2].filter(
      a => a !== undefined).length
  }

  /**
   * @returns {COMMAND} the type of the HVM command
   */
  getCommandType () {
    return this.commandType
  }

  /**
   * @returns {string} segment, function, or label name
   * @throws {CommandException} if called on the return command
   */
  getArg1 () {
    if (this.commandType === COMMAND.RETURN) {
      throw new CommandException(
        'return command doesn\'t have arg1')
    }
    if (isArithmeticCommand(this.commandType)) return this.commandType
    return this.arg1
  }

  /**
   * @returns {number} arg2 of HVM command
   * - segment index for push/pull commands,
   * - function's number of argument for call command, or
   * - function's number of local variables for function declaration command
   * @throws {CommandException} if called on the wrong command
   */
  getArg2 () {
    if (!this.isArg2Relevant()) {
      throw new CommandException(`${this.commandType} doesn't have arg2`)
    }
    return this.arg2
  }

  /**
   * Additional info for the command, for example `className` for push/pull
   * commands when the segment name is `static`
   * @returns {string} stringArg of the HVM command
   */
  getStringArg () {
    return this.stringArg
  }

  /**
   * @returns {boolean} true if arg2 makes sense for the current
   * command type; arg2 applies only to the following commands:
   * - `function`
   * - `call`
   * - `pop`
   * - `push`
   */
  isArg2Relevant () {
    return [
      COMMAND.FUNCTION,
      COMMAND.PUSH,
      COMMAND.POP,
      COMMAND.CALL].includes(this.commandType)
  }

  /**
   * @returns {number} the number of arguments.
   * - So for example if both arg1 and arg2 are set,
   * number of arguments is 2
   */
  getNumberOfArgs () {
    return this.numberOfArgs
  }

  /**
   * Returns an array of 3 Strings. The first is the command name,
   * the second is the first argument (arg1) and the third is the
   * second argument (arg2).
   * @returns {string} string array of command components in the
   * form [commandName, arg1, arg2]
   */
  getCommandComponents () {
    const result = [this.commandType === null ? '' : this.commandType, '', '']
    switch (this.commandType) {
      case COMMAND.PUSH:
        result[1] = this.arg1
        result[2] = String(this.arg2)
        break
      case COMMAND.POP:
        if (this.numberOfArgs === 2) {
          result[1] = this.arg1
          result[2] = String(this.arg2)
        }
        break
      case COMMAND.LABEL:
        result[1] = this.arg1
        break
      case COMMAND.GOTO:
        result[1] = this.arg1
        break
      case COMMAND.IF_GOTO:
        result[1] = this.arg1
        break
      case COMMAND.FUNCTION:
        result[1] = this.arg1
        result[2] = String(this.arg2)
        break
      case COMMAND.CALL:
        result[1] = this.arg1
        result[2] = String(this.arg2)
        break
      default:
        break
    }
    return result
  }

  /**
   * The string representation of the `HVMCommand`
   */
  toString () {
    const components = this.getCommandComponents()
    let result = ''
    if (components[0] === '') return ''
    result = result.concat(components[0])
    if (components[1] === '') return result.toString()
    result = result.concat(' ')
    result = result.concat(components[1])
    if (components[2] === '') return result.toString()
    result = result.concat(' ')
    result = result.concat(components[2])
    return result.toString()
  }
}

export default HVMCommand
