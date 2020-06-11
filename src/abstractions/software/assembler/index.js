import Parser from './parser'
import Code from './code'
import Writer from './writer'
import { COMMAND_TYPE } from './parser/types'

class Assembler {
  constructor (assemblyCode) {
    this.assemblyCode = assemblyCode
  }

  /**
   * @returns {string} corresponding machine code for the given assembly code
   */
  assemble () {
    const parser = new Parser(this.assemblyCode)
    const code = new Code()
    const writer = new Writer()

    parser.advance()
    while (parser.getCurrentCommand()) {
      const commandType = parser.commandType()
      switch (commandType) {
        case (COMMAND_TYPE.A_COMMAND):
          writer.write(code.getAInstructionMachineCode(parser.symbol()))
          break
        case (COMMAND_TYPE.C_COMMAND):
          writer.write(code.getCInstructionMachineCode(
            parser.comp(), parser.dest(), parser.jump()))
          break
      }
      parser.advance()
    }

    return writer.getResult()
  }
}

export default Assembler
