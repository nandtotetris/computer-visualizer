import { Not16 } from '.'

describe('Not16 function', () => {
  it('should correctly invert 16 bits', () => {
    const input = '0000111100001111'
    const expectedOutput = '1111000011110000'

    expect(Not16(input)).toBe(expectedOutput)
  })
})
