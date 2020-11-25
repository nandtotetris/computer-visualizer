import { convertTo16Bit } from '../ALU/util'
import MemoryException from './exception'

class Memory {
  constructor () {
    this.addressLimit = 24577
    this.memory = new Array(this.getAddressLimit()).fill(convertTo16Bit(0))
    this.observers = []
  }

  subscribe (f) {
    this.observers.push(f)
    return () => this.observers.splice(this.observers.length - 1, 1)
  }

  notify () {
    this.observers.forEach(o => o())
  }

  getAddressLimit () {
    return this.addressLimit
  }

  getMemory () {
    return this.memory
  }

  value (address) {
    const addressLimit = this.getAddressLimit()
    if (
      address > addressLimit || address < 0
    ) throw new MemoryException(`memory out of range (${address}), you can only access upto ${addressLimit} addresses`)
    return this.memory[address]
  }

  clear () {
    this.memory = this.memory.map(m => convertTo16Bit(0))
  }

  set (address, value) {
    const addressLimit = this.getAddressLimit()
    if (
      address > addressLimit || address < 0
    ) throw new MemoryException(`memory out of range (${address}), you can only access upto ${addressLimit} addresses`)
    this.memory[address] = value
    this.notify()
  }
}

export default Memory
