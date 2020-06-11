import Assembler from './index'
import { symbolLess } from './mockData'

describe('Assember class', () => {
  it('should translate add assembly code to machine code', () => {
    const assembler = new Assembler(symbolLess.ADD_ASSEMBLY_CODE)
    expect(assembler.assemble()).toBe(symbolLess.ADD_MACHINE_CODE.trim())
  })
  it('should translate max assembly code to machine code', () => {
    const assembler = new Assembler(symbolLess.MAX_ASSEMBLY_CODE)
    expect(assembler.assemble()).toBe(symbolLess.MAX_MACHINE_CODE.trim())
  })
  it('should translate rect assembly code to machine code', () => {
    const assembler = new Assembler(symbolLess.RECT_ASSEMBLY_CODE)
    expect(assembler.assemble()).toBe(symbolLess.RECT_MACHINE_CODE.trim())
  })
  it('should translate pong assembly code to machine code', () => {
    const assembler = new Assembler(symbolLess.PONG_ASSEMBLY_CODE)
    expect(assembler.assemble()).toBe(symbolLess.PONG_MACHINE_CODE.trim())
  })
})
