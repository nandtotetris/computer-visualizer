import {
  getInstructions,
  removeComments,
  commandType,
  isAddressInstruction,
  isLabelInstruction,
  getLabelName,
  getAddressName,
  dest,
  comp,
  jump
} from './index'
import { COMMAND_TYPE } from '../types'

describe('removeComments function', () => {
  it('removes comment', () => {
    const code = '// Hello'
    expect(removeComments(code)).toBe('')
  })

  it('should do nothing when there is no comment', () => {
    const code = 'A = A + 1'
    expect(removeComments(code)).toBe(code)
  })
})

describe('getInstructions function', () => {
  it('returns instructions from assembly code', () => {
    const expectedInstructions = ['@256', 'D=A', '@0', '@133', '(LOOP)']
    expect(getInstructions(getAssemblyTestCode())).toEqual(expectedInstructions)
  })
})

describe('commandType function', () => {
  it('returns A_COMMAND if instruction is of type address', () => {
    const instructions = ['@12', '@name', '@x.1']
    const expectedCommandType = COMMAND_TYPE.A_COMMAND
    instructions.forEach(inst => {
      const actualCommandType = commandType(inst)
      expect(actualCommandType).toBe(expectedCommandType)
    })
  })

  // TODO this is not a full test, commandType function always
  // returns C_COMMAND if instruction is not type A or L
  it('returns C_COMMAND if instruction is of type compute', () => {
    const instructions = ['D=M', '0;JMP', '1']
    const expectedCommandType = COMMAND_TYPE.C_COMMAND
    instructions.forEach(inst => {
      const actualCommandType = commandType(inst)
      expect(actualCommandType).toBe(expectedCommandType)
    })
  })

  it('returns L_COMMAND if instruction is of type label', () => {
    const instructions = ['(LOOP.1)', '(IF2)', '( XXX )']
    const expectedCommandType = COMMAND_TYPE.L_COMMAND
    instructions.forEach(inst => {
      const actualCommandType = commandType(inst)
      expect(actualCommandType).toBe(expectedCommandType)
    })
  })
})

describe('isLabelInstruction function', () => {
  it('returns true when instructions are label', () => {
    const instructions = ['(LOOP)', '(xxx)', '(x1x)']
    instructions.forEach(inst => {
      const actualResult = isLabelInstruction(inst)
      expect(actualResult).toBe(true)
    })
  })

  it('returns fale when instructions are not label', () => {
    const instructions = ['@123', '(12x)', 'D=M', '0;JNE']
    instructions.forEach(inst => {
      const actualResult = isLabelInstruction(inst)
      expect(actualResult).toBe(false)
    })
  })
})

describe('isAddressInstruction function', () => {
  it('returns true when instructions are address', () => {
    const instructions = ['@ab.cd', '@xxx', '@12']
    instructions.forEach(inst => {
      const actualResult = isAddressInstruction(inst)
      expect(actualResult).toBe(true)
    })
  })

  it('returns fale when instructions are not address', () => {
    const instructions = ['M=D', '@1+2', '0;JNE']
    instructions.forEach(inst => {
      const actualResult = isAddressInstruction(inst)
      expect(actualResult).toBe(false)
    })
  })
})

describe('getLabelName function', () => {
  it('returns the label name if it\'s a label instruction', () => {
    const instruction = '(Xxx.xx)'
    const expectedLabelName = 'Xxx.xx'
    const actualLabelName = getLabelName(instruction)
    expect(actualLabelName).toBe(expectedLabelName)
  })

  it(`returns the label name even if there are multiple spaces between open
   and close parenthesis`, () => {
    const instruction = '(     Xxx.xx         )'
    const expectedLabelName = 'Xxx.xx'
    const actualLabelName = getLabelName(instruction)
    expect(actualLabelName).toBe(expectedLabelName)
  })

  it('returns empty string if it\'s not a label instruction', () => {
    const instruction = '@15'
    const expectedLabelName = ''
    const actualLabelName = getLabelName(instruction)
    expect(actualLabelName).toBe(expectedLabelName)
  })
})

describe('getAddressName function', () => {
  it('returns the address number if it\'s a address instruction', () => {
    const instruction = '@15'
    const expectedAddressNumber = '15'
    const actualLabelName = getAddressName(instruction)
    expect(actualLabelName).toBe(expectedAddressNumber)
  })

  it('returns empty string if it\'s not a address instruction', () => {
    const instruction = '(Xx.yy)'
    const expectedAddressNumber = ''
    const actualLabelName = getAddressName(instruction)
    expect(actualLabelName).toBe(expectedAddressNumber)
  })
})

describe('dest function', () => {
  it('returns the correct destination if instruction is C_COMMAND', () => {
    const instruction = 'DM=A'
    const expectedDestination = 'DM'
    const actualDestination = dest(instruction)
    expect(actualDestination).toBe(expectedDestination)
  })

  it('returns empty string if instruction is not C_COMMAND', () => {
    const aInstruction = '@15'
    const lInstruction = '(xx.yy)'
    const expectedDestination = ''
    const actualLDestination = dest(aInstruction)
    const actualADestination = dest(lInstruction)

    expect(actualADestination).toBe(expectedDestination)
    expect(actualLDestination).toBe(expectedDestination)
  })
})

describe('comp function', () => {
  it('returns the correct computation if instruction is C_COMMAND Type and has both destination and jump', () => {
    const instruction = 'D=A+1;JLE'
    const expectedCompute = 'A+1'
    const actualCompute = comp(instruction)
    expect(actualCompute).toBe(expectedCompute)
  })

  it('returns the correct compute if instruction is C_COMMAND Type and has only destination', () => {
    const instruction = 'DM=1'
    const expectedCompute = '1'
    const actualCompute = comp(instruction)
    expect(actualCompute).toBe(expectedCompute)
  })

  it('returns the correct compute if instruction is C_COMMAND Type and has only jump', () => {
    const instruction = 'A;JMP'
    const expectedCompute = 'A'
    const actualCompute = comp(instruction)
    expect(actualCompute).toBe(expectedCompute)
  })

  it('returns empty string if instruction is not C_COMMAND Type', () => {
    const aInstruction = '@15'
    const lInstruction = '(xx.yy)'
    const expectedCompute = ''
    const actualLCompute = dest(aInstruction)
    const actualACompute = dest(lInstruction)

    expect(actualACompute).toBe(expectedCompute)
    expect(actualLCompute).toBe(expectedCompute)
  })
})

describe('jump function', () => {
  it('returns the correct jump mnemonic if instruction is C_COMMAND', () => {
    const instruction = '0; JNE'
    const expectedJump = 'JNE'
    const actualJump = jump(instruction)
    expect(actualJump).toBe(expectedJump)
  })

  it('returns the empty string if instruction is not C_COMMAND', () => {
    const aInstruction = '@15'
    const lInstruction = '(xx.yy)'
    const expectedJump = ''
    const actualLJump = dest(aInstruction)
    const actualAJump = dest(lInstruction)

    expect(actualAJump).toBe(expectedJump)
    expect(actualLJump).toBe(expectedJump)
  })
})

const getAssemblyTestCode = () => {
  return ` 



    // This file is part of www.nand2tetris.org
         // and the book "The Elements of Computing Systems"
    // by Nisan and Schocken, MIT Press.
        // File name: projects/06/pong/PongL.asm

    // Symbol-less version of the Pong.asm program.

        @256       
    D=A
       @0
    @133
    (LOOP)


           
  `
}
