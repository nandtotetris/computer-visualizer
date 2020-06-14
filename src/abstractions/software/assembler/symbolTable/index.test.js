import SymbolTable from './index'

describe('SymbolTable class', () => {
  const symbolTable = new SymbolTable()

  it('should return predefined symbols', () => {
    expect(symbolTable.getAdress('SP')).toBe(0)
    expect(symbolTable.getAdress('R0')).toBe(0)
    expect(symbolTable.getAdress('SCREEN')).toBe(16384)
  })

  it('should add entry (symbol, address) to the table and return the associated address', () => {
    symbolTable.addEntry('END', 0)
    expect(symbolTable.getAdress('END')).toBe(0)
  })

  it('shoudn\'t add (symbol, address) pair, if symbol exists', () => {
    symbolTable.addEntry('age', 23)
    symbolTable.addEntry('age', 25)
    expect(symbolTable.getAdress('age')).toBe(23)
  })

  it('return true if symbol exists', () => {
    const symbol = 'isGraph'
    symbolTable.addEntry(symbol, 11)
    expect(symbolTable.contains(symbol)).toBe(true)
  })

  it('return false if symbol doesn\'t exist', () => {
    expect(symbolTable.contains('asdf')).toBe(false)
  })
})
