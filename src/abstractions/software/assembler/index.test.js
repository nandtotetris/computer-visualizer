import Assembler from './index'
import { symbolLessAssembly, assembly } from './mockData'
import { getPredefinedSymbols } from './symbolTable/utils'

describe('Assember class', () => {
  it('should translate the ADD symbol less assembly code to machine code', () => {
    const assembler = new Assembler(symbolLessAssembly.ADD_ASSEMBLY_CODE)
    expect(assembler.assemble()).toBe(symbolLessAssembly.ADD_MACHINE_CODE.trim())
  })
  it('should translate the MAX symbol less assembly code to machine code', () => {
    const assembler = new Assembler(symbolLessAssembly.MAX_ASSEMBLY_CODE)
    expect(assembler.assemble()).toBe(symbolLessAssembly.MAX_MACHINE_CODE.trim())
  })
  it('should translate the RECT symbol less assembly code to machine code', () => {
    const assembler = new Assembler(symbolLessAssembly.RECT_ASSEMBLY_CODE)
    expect(assembler.assemble()).toBe(symbolLessAssembly.RECT_MACHINE_CODE.trim())
  })
  it('should translate the PONG symbol less assembly code to machine code', () => {
    const assembler = new Assembler(symbolLessAssembly.PONG_ASSEMBLY_CODE)
    expect(assembler.assemble()).toBe(symbolLessAssembly.PONG_MACHINE_CODE.trim())
  })

  it('should translate the MAX assembly code to machine code', () => {
    const assembler = new Assembler(assembly.MAX_ASSEMBLY_CODE)
    expect(assembler.assemble()).toBe(assembly.MAX_MACHINE_CODE.trim())
  })

  it('should translate the RECT symbol assembly code to machine code', () => {
    const assembler = new Assembler(assembly.RECT_ASSEMBLY_CODE)
    expect(assembler.assemble()).toBe(assembly.RECT_MACHINE_CODE.trim())
  })

  it('should translate the PONG symbol assembly code to machine code', () => {
    const assembler = new Assembler(assembly.PONG_ASSEMBLY_CODE)
    expect(assembler.assemble()).toBe(assembly.PONG_MACHINE_CODE.trim())
  })

  it('should bind ROM address to a label, when label is the first instruction', () => {
    const assembler = new Assembler(getLabelFirstAssemblyTestCode())
    const expectedSymbolTable = { ...getPredefinedSymbols(), LOOP: 0 }
    assembler.firstPass()
    const actualSymbolTable = assembler.getSymbolTable()
    expect(actualSymbolTable).toEqual(expectedSymbolTable)
  })

  it('should bind ROM address to a label, when label is the last instruction', () => {
    const assembler = new Assembler(getLabelLastAssemblyTestCode())
    const expectedSymbolTable = { ...getPredefinedSymbols(), LOOP: 2 }
    assembler.firstPass()
    const actualSymbolTable = assembler.getSymbolTable()
    expect(actualSymbolTable).toEqual(expectedSymbolTable)
  })

  it('should bind ROM addresses to labels', () => {
    const assembler = new Assembler(getAssemblyTestCode())
    const expectedSymbolTable = { ...getPredefinedSymbols(), LOOP: 1, END: 3, EXIT: 5 }
    assembler.firstPass()
    const actualSymbolTable = assembler.getSymbolTable()
    expect(actualSymbolTable).toEqual(expectedSymbolTable)
  })
})

const getLabelFirstAssemblyTestCode = () => {
  return `
    // This file is part of www.nand2tetris.org
    // and the book "The Elements of Computing Systems"
    // by Nisan and Schocken, MIT Press.
    // File name: projects/06/pong/PongL.asm

    // Symbol-less version of the Pong.asm program.
    (LOOP)
    @256
    D=A
  `
}

const getLabelLastAssemblyTestCode = () => {
  return `
    // This file is part of www.nand2tetris.org
    // and the book "The Elements of Computing Systems"
    // by Nisan and Schocken, MIT Press.
    // File name: projects/06/pong/PongL.asm

    // Symbol-less version of the Pong.asm program.

    @256
    D=A
    (LOOP)
  `
}

const getAssemblyTestCode = () => {
  return `
    // This file is part of www.nand2tetris.org
    // and the book "The Elements of Computing Systems"
    // by Nisan and Schocken, MIT Press.
    // File name: projects/06/pong/PongL.asm

    // Symbol-less version of the Pong.asm program.

    @256
    (LOOP)
    D=A
    D=D-M
    (END)
    @10
    D;JGT
    (EXIT)
  `
}
