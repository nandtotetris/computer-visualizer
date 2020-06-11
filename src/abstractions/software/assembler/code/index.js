import { leftPadWithZeros, convertToBinary } from './utils'

/**
 * Proxy to check if key or its sort is found
 * MAD or AMD
 */
const destinationCodeTrap = {
  get: (obj, key) => {
    key = key.toUpperCase()
    return obj[key] ||
      obj[[...key].sort().join('')]
  }
}

const DESTIONATION_CODES = new Proxy(Object.freeze({
  M: '001',
  D: '010',
  DM: '011',
  A: '100',
  AM: '101',
  AD: '110',
  ADM: '111'
}), destinationCodeTrap)

const JUMP_CODES = Object.freeze({
  JGT: '001',
  JEQ: '010',
  JGE: '011',
  JLT: '100',
  JNE: '101',
  JLE: '110',
  JMP: '111'
})

/**
 * Proxy to check if key or its reverse is found
 * D+1 or 1+D
 */
const computeCodeTrap = {
  get: (obj, key) => {
    // if it is not type (A operator B), no need to check the revert
    key = key.toUpperCase()
    if (key.length !== 3) return obj[key]
    return obj[key] || obj[[...key].reverse().join('')]
  }
}

const COMPUTE_CODES = new Proxy(Object.freeze({
  0: '0101010',
  1: '0111111',
  '-1': '0111010',
  D: '0001100',
  A: '0110000',
  '!D': '0001101',
  '!A': '0110001',
  '-D': '0001111',
  '-A': '0110011',
  'D+1': '0011111',
  'A+1': '0110111',
  'D-1': '0001110',
  'A-1': '0110010',
  'D+A': '0000010',
  'D-A': '0010011',
  'A-D': '0000111',
  'D&A': '0000000',
  'D|A': '0010101',
  M: '1110000',
  '!M': '1110001',
  '-M': '1110011',
  'M+1': '1110111',
  'M-1': '1110010',
  'D+M': '1000010',
  'D-M': '1010011',
  'M-D': '1000111',
  'D&M': '1000000',
  'D|M': '1010101'
}), computeCodeTrap)

class Code {
  /**
    * @param {string} mnemonic dest mnemonic
    * @returns {string} the binary code of the dest mnemonic
    */
  dest (mnemonic) {
    if (!mnemonic) return '000'
    return DESTIONATION_CODES[mnemonic]
  }

  /**
    * @param {string} mnemonic comp mnemonic
    * @returns {string} the binary code of the comp mnemonic
    */
  comp (mnemonic) {
    return COMPUTE_CODES[mnemonic]
  }

  /**
    * @param {string} mnemonic comp mnemonic
    * @returns {string} the binary code of the jump mnemonic
    */
  jump (mnemonic) {
    if (!mnemonic) return '000'
    return JUMP_CODES[mnemonic.toUpperCase()]
  }

  /**
   * @param {number} address decimal value of assembly address location
   * @returns {string} machine code for A instruction
   */
  getAInstructionMachineCode (address) {
    return '0' + leftPadWithZeros(convertToBinary(address), 15)
  }

  /**
   * @param {string} comp computation compute code such as `A+D`
   * @param {string} dest destination code such as `MD`
   * @param {string} jump jump code such as `JGT`
   * @returns {string} machine code for C instruction
   */
  getCInstructionMachineCode (comp, dest, jump) {
    return '111' + this.comp(comp) + this.dest(dest) + this.jump(jump)
  }
}

export default Code
