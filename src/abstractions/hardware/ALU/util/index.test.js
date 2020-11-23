import { convertToNumber, getComputeFromInstruction } from '.'

describe('convertToNumber function', () => {
  it('should convert 16 bits to number', () => {
    const input = '0000000000000101'
    const expectedOutput = 5
    expect(convertToNumber(input)).toBe(expectedOutput)
  })

  it('should return 0', () => {
    const input = '0000000000000000'
    const expectedOutput = 0
    expect(convertToNumber(input)).toBe(expectedOutput)
  })
})

describe('getComputeFromInstruction', () => {
  it('should return correct compute from given instruction', () => {
    const instruction = '1110111111001000'
    expect(
      getComputeFromInstruction(instruction)
    ).toBe('111111')
  })
})
