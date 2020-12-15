import { COMPUTE_CODES } from 'abstractions/software/assembler/code'
import { revertObject } from './util'

export const revertedComputeCodes = revertObject(COMPUTE_CODES)

class MachineInstruction {
  constructor (instruction) {
    this.instruction = instruction
  }

  isCInstruction () {
    return this.instruction[0] === '1'
  }

  isMInput () {
    return this.instruction[3] === '1'
  }

  getControlBits () {
    return this.instruction.slice(4, 10)
  }

  getInstruction () {
    return this.instruction
  }

  getDestinations () {
    const result = []
    const isCInstruction = this.isCInstruction()

    if (!isCInstruction) return result

    const isADest = this.instruction[10] === '1'
    const isDDest = this.instruction[11] === '1'
    const isMDest = this.instruction[12] === '1'

    if (isADest) result.push('A')
    if (isDDest) result.push('D')
    if (isMDest) result.push('M')

    return result
  }

  getSelectorWithControlBits () {
    return this.instruction.slice(3, 10)
  }

  getOperation () {
    if (!this.isCInstruction()) return

    return revertedComputeCodes[this.getSelectorWithControlBits()]
  }

  getJumpBits () {
    return this.instruction.slice(13, 16)
  }
}

export default MachineInstruction
