import Memory, { MAX_MEMORY_LIMIT } from '.'

describe('Memory chip', () => {
  const memory = new Memory()

  afterEach(() => {
    memory.clear()
  })

  it('should return 0 in 16 bits when there is no value in specified address', () => {
    expect(memory.value(18)).toBe('0000000000000000')
  })

  it('should set, get stored values and clear instructions', () => {
    memory.set(0, '1110011111010000')
    memory.set(1, '0000000000001000')
    memory.set(2, '0000000000000000')
    memory.set(16384, '0000000000000111')

    expect(memory.value(0)).toBe('1110011111010000')
    expect(memory.value(1)).toBe('0000000000001000')
    expect(memory.value(2)).toBe('0000000000000000')
    expect(memory.value(16384)).toBe('0000000000000111')

    memory.clear()
    expect(memory.value(0)).toBe('0000000000000000')
  })

  it('should throw an exception if memory address we want to access is out of range', () => {
    let error = null
    try {
      memory.value(MAX_MEMORY_LIMIT + 1)
    } catch (e) {
      error = e
      expect(e.message).toBe(`Memory Exception, memory out of range (${MAX_MEMORY_LIMIT + 1}), you can only access upto ${MAX_MEMORY_LIMIT} addresses`)
    }
    expect(error).toBeTruthy()
  })

  it('should throw an exception if memory address we want to access is out of range(less than 0)', () => {
    let error = null
    try {
      memory.value(-1)
    } catch (e) {
      error = e
      expect(e.message).toBe(`Memory Exception, memory out of range (-1), you can only access upto ${MAX_MEMORY_LIMIT} addresses`)
    }
    expect(error).toBeTruthy()
  })
})
