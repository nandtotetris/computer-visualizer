import { And, And16 } from './index'

describe('And chip', () => {
  it('should return 1 if two bits are on', () => {
    expect(And('1', '1')).toBe('1')
  })

  it('should return 0 if two bits are on', () => {
    expect(And('1', '0')).toBe('0')
  })

  it('should return 0 if two bits are on', () => {
    expect(And('0', '1')).toBe('0')
  })

  it('should return 0 if two bits are on', () => {
    expect(And('0', '0')).toBe('0')
  })
})

describe('And16 chip', () => {
  it('should correctly and two 16 bits', () => {
    const a = '1111000011110000'
    const b = '1100110011001100'
    const expectedOutput = '1100000011000000'
    expect(And16(a, b)).toBe(expectedOutput)
  })
})
