import { leftPadWithZeros, convertToBinary } from './index'

describe('leftPadWithZeros funciton', () => {
  it('pads zeros if length is greater than characters in num', () => {
    const binary = '101'
    const places = 5
    const expectedBinary = '00101'
    expect(leftPadWithZeros(binary, places)).toBe(expectedBinary)
  })

  it('shouldn\'t pad zeros if places is less than or equal num', () => {
    const binary = '101'
    const places = 3
    const expectedBinary = '101'
    expect(leftPadWithZeros(binary, places)).toBe(expectedBinary)
  })
})

describe('convertToBinary function', () => {
  it('should convert a number to binary', () => {
    const num = 5
    const expectedBinary = '101'
    expect(convertToBinary(num)).toBe(expectedBinary)
  })
})
