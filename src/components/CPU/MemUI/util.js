import { convertToNumber } from 'abstractions/hardware/ALU/util'
import { JUMP_CODES, DESTIONATION_CODES, COMPUTE_CODES } from 'abstractions/software/assembler/code'
import { revertObject } from '../util'

const revertedJumpCode = revertObject(JUMP_CODES)
const revertedDestCode = revertObject(DESTIONATION_CODES)
const revertedComputeCode = revertObject(COMPUTE_CODES)

export const getAssmFromInstruction = instruction => {
  if (!instruction) return ''
  if (isCInstruction(instruction)) return getCInstructionAssm(instruction)
  return getAInstructionAssm(instruction)
}

const getAInstructionAssm = instruction => {
  return `@${convertToNumber(instruction)}`
}

const getCInstructionAssm = instruction => {
  let assm = ''

  const dest = revertedDestCode[getDestCodes(instruction)]
  const jump = revertedJumpCode[getJumpCodes(instruction)]
  const compute = revertedComputeCode[getComputeCodes(instruction)]

  if (dest) assm += dest + '='
  if (compute) assm += compute
  if (jump) assm += ';' + jump

  return assm
}

const getDestCodes = instruction => instruction.slice(10, 13)

const getJumpCodes = instruction => instruction.slice(13, 16)

const getComputeCodes = instruction => instruction.slice(3, 10)

const isCInstruction = instruction => instruction[0] === '1'
