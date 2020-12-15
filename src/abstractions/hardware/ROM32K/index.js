import ROMException from './exception'

export const MAX_ADDRESS_LIMIT = Math.pow(2, 15) // 15 bits

class ROM32K {
  constructor () {
    this.addressLimit = Math.pow(2, 15) // 15 bits combination
    this.memory = new Array(this.getAddressLimit()).fill('')
  }

  getAddressLimit () {
    return this.addressLimit
  }

  subscribe () {
    return () => {}
  }

  value (address) {
    const addressLimit = this.getAddressLimit()

    if (
      address > addressLimit
    ) throw new ROMException(`memory out of range (${address}), you can only access upto ${addressLimit} addresses`)
    return this.memory[address]
  }

  clear () {
    this.memory = this.memory.map(m => '')
  }

  load (instructions) {
    const addressLimit = this.getAddressLimit()

    if (
      instructions.length > addressLimit
    ) throw new ROMException(`you can only load ${addressLimit} instructions`)
    this.memory.splice(0, instructions.length, ...instructions)
  }

  getMemory () {
    return this.memory
  }

  length () {
    let counter = 0
    while (this.memory[counter]) counter++
    return counter
  }
}

export default ROM32K
