import Parser from './index'

describe('Parser class', () => {
  it('should parse assembly code', () => {
    const parser = new Parser(getAssembleTestCode())
    expect(parser.getCurrentCommand()).toBe('')
    parser.advance()
    expect(parser.getCurrentCommand()).toBe('@256')
    parser.advance()
    expect(parser.getCurrentCommand()).toBe('D=A')
    parser.advance()
    expect(parser.getCurrentCommand()).toBe('(LOOP)')
    // If there are no more instructions, current command should reset to empty string
    parser.advance()
    expect(parser.getCurrentCommand()).toBe('')
  })
})

const getAssembleTestCode = () => {
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
