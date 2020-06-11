import Code from './index'

describe('Code class', () => {
  const code = new Code()

  describe('dest property', () => {
    it('should return correct dest code, if mnemonic is small letter', () => {
      const mnemonic = 'amd'
      expect(code.dest(mnemonic)).toBe('111')
    })

    it('should return correct dest code, regardless of mnemonic orders', () => {
      const mnemonic = 'mDa'
      expect(code.dest(mnemonic)).toBe('111')
    })

    it('should return 000, if there is no menmonic', () => {
      const mnemonic = ''
      expect(code.dest(mnemonic)).toBe('000')
    })
  })

  describe('comp property', () => {
    it('should return correct comp, regardles of the positions of the operands', () => {
      const mnemonic = 'D+1'
      const mnemonic2 = '1+D'
      const expectedCode = '0011111'
      expect(code.comp(mnemonic)).toBe(expectedCode)
      expect(code.comp(mnemonic2)).toBe(expectedCode)
    })

    it('should return correct comp, if operands are small', () => {
      const mnemonic = 'd+1'
      const expectedCode = '0011111'
      expect(code.comp(mnemonic)).toBe(expectedCode)
    })

    it('should return correct comp for a single operand and operator', () => {
      const mnemonic = '!D'
      const mnemonic2 = 'D!'
      expect(code.comp(mnemonic)).toBe('0001101')
      expect(code.comp(mnemonic2)).toBe(undefined)
    })
  })

  describe('jump property', () => {
    it('should return correct jump code, if mnemonic is small letter', () => {
      const mnemonic = 'jgt'
      expect(code.jump(mnemonic)).toBe('001')
    })
  })
})
