import {
  COMMENT_REGEX,
  ADRESS_INSTR_REGEX,
  LABEL_INSTR_REGEX
} from './regex'

describe('comment regex', () => {
  it('returns true for empty comment', () => {
    const comment = '//'
    expect(COMMENT_REGEX.test(comment)).toBe(true)
  })

  it('returns true if there is a comment', () => {
    const comment = '// This is a comment'
    expect(new RegExp(COMMENT_REGEX).test(comment)).toBe(true)
  })

  it('returns false if there is no comment', () => {
    const instr = 'D=M+1'
    expect(COMMENT_REGEX.test(instr)).toBe(false)
  })
})

describe('address regex', () => {
  it('returns true if mnemonic is address symbol', () => {
    const mnemonic = '@abcd'
    expect(ADRESS_INSTR_REGEX.test(mnemonic)).toBe(true)
  })

  it('returns true if mnemonic is address number', () => {
    const mnemonic = '@23'
    expect(ADRESS_INSTR_REGEX.test(mnemonic)).toBe(true)
  })

  it('returns false if mnemonic is not address', () => {
    const mnemonic = '1@23'
    expect(ADRESS_INSTR_REGEX.test(mnemonic)).toBe(false)
  })
})

describe('label regex', () => {
  it('returns true if mnemonic is label', () => {
    const mnemonic = '( abcd )'
    expect(LABEL_INSTR_REGEX.test(mnemonic)).toBe(true)
  })

  it('returns false if mnemonic is not label', () => {
    const mnemonic = '1(ab)'
    expect(LABEL_INSTR_REGEX.test(mnemonic)).toBe(false)
  })

  it('returns false if mnemonic is label but doesn\'t have value', () => {
    const mnemonic = '@'
    expect(LABEL_INSTR_REGEX.test(mnemonic)).toBe(false)
  })
})
