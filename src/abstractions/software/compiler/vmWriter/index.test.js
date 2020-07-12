import VMWriter from './index'
import { SEGMENTS, COMMANDS } from './types'

describe('VMWritter class', () => {
  const vmWriter = new VMWriter()

  afterEach(() => {
    // Instead of creating a new vmWritter object in each tests,
    // we can clear the field value of it and can be used by other tests.
    vmWriter.reset()
  })

  it('should write push command', () => {
    const expectedVM = 'push argument 0\npush static 3\npush that 1'

    vmWriter.writePush(SEGMENTS.ARGUMENT, 0)
    vmWriter.writePush(SEGMENTS.STATIC, 3)
    vmWriter.writePush(SEGMENTS.THAT, 1)
    expect(vmWriter.getVM()).toBe(expectedVM.trim())
  })

  it('should write pop command', () => {
    const expectedVM = 'pop local 1\npop temp 4'
    vmWriter.writePop(SEGMENTS.LOCAL, 1)
    vmWriter.writePop(SEGMENTS.TEMP, 4)
    expect(vmWriter.getVM()).toBe(expectedVM)
  })

  it('should write arithmetic command', () => {
    const expectedVM = 'add\ngt\nnot\nneg'

    vmWriter.writeArithmetic(COMMANDS.ADD)
    vmWriter.writeArithmetic(COMMANDS.GT)
    vmWriter.writeArithmetic(COMMANDS.NOT)
    vmWriter.writeArithmetic(COMMANDS.NEG)

    expect(vmWriter.getVM()).toBe(expectedVM)
  })

  it('should write label command', () => {
    const expectedVM = 'label WHILE_START0'
    vmWriter.writeLabel('WHILE_START0')
    expect(vmWriter.getVM()).toBe(expectedVM)
  })

  it('should write call command', () => {
    const expectedVM = 'call YYY.xxx 2'
    vmWriter.writeCall('YYY.xxx', 2)
    expect(vmWriter.getVM()).toBe(expectedVM)
  })

  it('should write function command', () => {
    const expectedVM = 'function YYY.xxx 4'
    vmWriter.writeFunction('YYY.xxx', 4)
    expect(vmWriter.getVM()).toBe(expectedVM)
  })

  it('should write return command', () => {
    const expectedVM = 'return'
    vmWriter.writeReturn()
    expect(vmWriter.getVM()).toBe(expectedVM)
  })
})
