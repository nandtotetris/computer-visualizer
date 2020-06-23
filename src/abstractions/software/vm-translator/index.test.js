import HVMTranslator from './index'
/**
 * The following are Hack hvm and assembly programs that have passed the comparison test
 * given in the book. If you have doubts, verify for yourself that they are indeed
 * correct results. You can do so by following instructions given at the end of
 * chapter 07 and 08 in the Nand2Tetris book
 * @see https://www.nand2tetris.org/course
 */
import { StackTestHVM, StackTestAssembly } from './mockData/stackTest'
import { SimpleAddHVM, SimpleAddAssembly } from './mockData/simpleAdd'
import { BasicTestHVM, BasicTestAssembly } from './mockData/basicTest'
import { PointerTestHVM, PointerTestAssembly } from './mockData/pointerTest'
import { StaticTestHVM, StaticTestAssembly } from './mockData/staticTest'

describe('HVMTranslator class', () => {
  it('should translate the StackTest hvm code to assembly code', () => {
    const hvmTranslator = new HVMTranslator([{ file: StackTestHVM }])
    expect(hvmTranslator.translate()).toBe(StackTestAssembly.trim())
  })
  it('should translate the SimpleAdd hvm code to assembly code', () => {
    const hvmTranslator = new HVMTranslator([{ file: SimpleAddHVM }])
    expect(hvmTranslator.translate()).toBe(SimpleAddAssembly.trim())
  })
  it('should translate the BasicTest hvm code to assembly code', () => {
    const hvmTranslator = new HVMTranslator([{ file: BasicTestHVM }])
    expect(hvmTranslator.translate()).toBe(BasicTestAssembly.trim())
  })
  it('should translate the PointerTest hvm code to assembly code', () => {
    const hvmTranslator = new HVMTranslator([{ file: PointerTestHVM }])
    expect(hvmTranslator.translate()).toBe(PointerTestAssembly.trim())
  })
  it('should translate pong hvm code to assembly code', () => {
    const hvmTranslator = new HVMTranslator([{
      file: StaticTestHVM, className: 'StaticTest'
    }])
    expect(hvmTranslator.translate()).toBe(StaticTestAssembly.trim())
  })
})
