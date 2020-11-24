import ROM32K, { MAX_ADDRESS_LIMIT } from '.'

describe('ROM32K chip', () => {
  const rom = new ROM32K()

  afterEach(() => {
    rom.clear()
  })

  it('should return 0 in 16 bits when there is no value in specified address', () => {
    expect(rom.value(18)).toBe('0000000000000000')
  })

  it('should load and clear instructions', () => {
    const instructions = [
      '0000000000000100',
      '1110011111010000',
      '0000000000001000'
    ]
    rom.load(instructions)

    expect(rom.value(0)).toBe('0000000000000100')
    expect(rom.value(1)).toBe('1110011111010000')
    expect(rom.value(2)).toBe('0000000000001000')
    expect(rom.value(3)).toBe('0000000000000000')

    rom.clear()
    expect(rom.value(1)).toBe('0000000000000000')
  })

  it('should throw an exception if memory address we want to access is out of range', () => {
    let error = null
    try {
      rom.value(32769)
    } catch (e) {
      error = e
      expect(e.message).toBe(`ROM Exception, memory out of range (32769), you can only access upto ${MAX_ADDRESS_LIMIT} addresses`)
    }
    expect(error).toBeTruthy()
  })

  it('should throw an exception if instructions we want to load is more than the ROM addresses', () => {
    let error = null
    try {
      rom.load(new Array(MAX_ADDRESS_LIMIT + 1).fill(0))
    } catch (e) {
      error = e
      expect(e.message).toBe('ROM Exception, you can only load 32768 instructions')
    }
    expect(error).toBeTruthy()
  })
})
