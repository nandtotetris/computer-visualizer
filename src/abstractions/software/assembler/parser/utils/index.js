import { COMMENT_REGEX, ADRESS_INSTR_REGEX, LABEL_INSTR_REGEX } from './regex'
import { COMMAND_TYPE } from '../types'

/**
 * @param {string} assemblyCode assembly code
 * @returns {Array} instructions
 */
export const getInstructions = assemblyCode => {
  assemblyCode = removeComments(assemblyCode)
  const instructions = []
  assemblyCode.split('\n').forEach(instruction => {
    const trimmedInstruction = instruction.trim()
    if (trimmedInstruction) instructions.push(trimmedInstruction)
  })

  return instructions
}

export const removeComments = assemblyCode => {
  return assemblyCode.replace(COMMENT_REGEX, '')
}

/**
 * @returns {COMMAND_TYPE} type of the current command
 * A_COMMAND for &#64;Xxx where Xxx is either a symbol or a decimal number
 * C_COMMAND for dest=comp;jmp
 * L_COMMAND for (Xxx) where Xxx is a symbol
 */
export const commandType = instruction => {
  if (isAddressInstruction(instruction)) return COMMAND_TYPE.A_COMMAND
  else if (isLabelInstruction(instruction)) return COMMAND_TYPE.L_COMMAND
  // TODO we should also check if instruction is C_COMMAND TYPE
  return COMMAND_TYPE.C_COMMAND
}

/**
 * @param {string} instruction instruction
 * @returns {boolean} checks if it is an A(address) instruction
 */
export const isAddressInstruction = instruction => {
  return ADRESS_INSTR_REGEX.test(instruction)
}

/**
 * @param {string} instruction instruction
 * @returns {boolean} checks if it is a label instruction
 */
export const isLabelInstruction = instruction => {
  return LABEL_INSTR_REGEX.test(instruction)
}

// TODO
/**
 * @param {string} instruction instruction
 * @returns {boolean} checks if it is a C(compute) instruction
 */
export const isComputeInstruction = instruction => {}

/**
 * @param {string} instruction instruction of type L_COMMAND
 * @returns {string} label name
 */
export const getLabelName = instruction => {
  if (!isLabelInstruction(instruction)) return ''
  return getFirstMatch(LABEL_INSTR_REGEX, instruction)
}

/**
 * @param {string} instruction instruction of type A_COMMAND
 * @returns {string} adress symbol or number
 */
export const getAddressName = instruction => {
  if (!isAddressInstruction(instruction)) return ''
  return getFirstMatch(ADRESS_INSTR_REGEX, instruction)
}

/**
 * @param {string} instruction instruction of type C_COMMAND
 * @returns {string} destination if instruction is C_COMMAND type, else empty string
 */
export const dest = instruction => {
  const indexOfEqual = instruction.indexOf('=')
  if (indexOfEqual === -1) return ''
  return instruction.slice(0, indexOfEqual).trim()
}

/**
 * @param {string} instruction instruction of type C_COMMAND
 * @returns {string} the computation part of a C_COMMAND instruction
 */
export const comp = instruction => {
  const hasDestination = instruction.indexOf('=') !== -1
  const hasJump = instruction.indexOf(';') !== -1
  if (!hasDestination && !hasJump) return ''
  if (
    hasDestination && hasJump
  ) return getComputeFromDestAndJump(instruction)
  if (hasDestination) return getComputeFromDest(instruction)
  return getComputeFromJump(instruction)
}

const getComputeFromDestAndJump = instruction => (
  instruction.split('=')[1].trim().split(';')[0].trim()
)

const getComputeFromDest = instruction => (
  instruction.split('=')[1].trim()
)

const getComputeFromJump = instruction => (
  instruction.split(';')[0].trim()
)

/**
 * @param {RegExp} regex regex
 * @param {string} search search
 * @returns {string} the first match
 */
const getFirstMatch = (regex, search) => regex.exec(search)[1]

/**
 * @param {string} instruction instruction of type C_COMMAND
 * @returns {string} jump mnemonic
 */
export const jump = instruction => {
  const hasJump = instruction.indexOf(';') !== -1
  if (!hasJump) return ''
  return instruction.split(';')[1].trim()
}
