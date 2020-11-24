import { convertTo16Bit } from '../ALU/util'
import MemoryException from './exception'

export const MAX_MEMORY_LIMIT = 24576

class Memory {
  constructor () {
    this.memory = new Array(MAX_MEMORY_LIMIT).fill(convertTo16Bit(0))
  }

  value (address) {
    if (
      address > MAX_MEMORY_LIMIT || address < 0
    ) throw new MemoryException(`memory out of range (${address}), you can only access upto ${MAX_MEMORY_LIMIT} addresses`)
    return this.memory[address]
  }

  clear () {
    this.memory = this.memory.map(m => convertTo16Bit(0))
  }

  set (address, value) {
    if (
      address > MAX_MEMORY_LIMIT || address < 0
    ) throw new MemoryException(`memory out of range (${address}), you can only access upto ${MAX_MEMORY_LIMIT} addresses`)
    this.memory[address] = value
  }
}

export default Memory
