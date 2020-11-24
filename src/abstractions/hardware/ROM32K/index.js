import { convertTo16Bit } from '../ALU/util'
import ROMException from './exception'

export const MAX_ADDRESS_LIMIT = Math.pow(2, 15) // 15 bits

class ROM32K {
  constructor () {
    this.memory = []
  }

  value (address) {
    if (
      address > MAX_ADDRESS_LIMIT
    ) throw new ROMException(`memory out of range (${address}), you can only access upto ${MAX_ADDRESS_LIMIT} addresses`)
    return this.memory[address] || convertTo16Bit(0)
  }

  clear () {
    this.memory = this.memory.map(m => convertTo16Bit(0))
  }

  load (instructions) {
    if (
      instructions.length > MAX_ADDRESS_LIMIT
    ) throw new ROMException(`you can only load ${MAX_ADDRESS_LIMIT} instructions`)
    this.memory = instructions
  }
}

export default ROM32K
