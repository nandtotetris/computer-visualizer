import SymbolTable from './index'
import { KIND_TYPE } from './types'
import CompilationEngine from '../compilationEngine'
import { SymbolTableMockData } from '../mockData'
import VMWriter from '../vmWriter'

describe('SymbolTable class', () => {
  describe('methods', () => {
    const symbolTable = new SymbolTable()
    it('should reset subroutine symbol when `startSubroutine` method is called', () => {
      // This will add an `i` integer variable with kind VAR to
      // subroutine symbol table
      symbolTable.define('i', 'int', KIND_TYPE.VAR)
      symbolTable.startSubroutine()
      expect(symbolTable.subroutineSymbolTable).toEqual({})
    })

    it('should define new identifiers to class symbol table and return correct kind, type and index', () => {
      symbolTable.define('age', 'int', KIND_TYPE.FIELD)
      symbolTable.define('isEnd', 'boolean', KIND_TYPE.FIELD)

      // age field variable
      expect(symbolTable.kindOf('age')).toBe(KIND_TYPE.FIELD)
      expect(symbolTable.typeOf('age')).toBe('int')
      expect(symbolTable.indexOf('age')).toBe(0)

      // isEnd field variable
      expect(symbolTable.kindOf('isEnd')).toBe(KIND_TYPE.FIELD)
      expect(symbolTable.typeOf('isEnd')).toBe('boolean')
      expect(symbolTable.indexOf('isEnd')).toBe(1)
    })

    it('should define new identifiers to subroutine symbol table and return correct kind, type and index', () => {
      symbolTable.define('counter', 'int', KIND_TYPE.VAR)
      symbolTable.define('name', 'string', KIND_TYPE.ARG)

      // age field variable
      expect(symbolTable.kindOf('counter')).toBe(KIND_TYPE.VAR)
      expect(symbolTable.typeOf('counter')).toBe('int')
      expect(symbolTable.indexOf('counter')).toBe(0)

      // isEnd field variable
      expect(symbolTable.kindOf('name')).toBe(KIND_TYPE.ARG)
      expect(symbolTable.typeOf('name')).toBe('string')
      expect(symbolTable.indexOf('name')).toBe(0)
    })

    it('should return correct number of variables for a given kind', () => {
      expect(symbolTable.varCount(KIND_TYPE.FIELD)).toBe(2)
    })
  })

  it('should add identifiers to the symbol table', () => {
    const symbolTable = new SymbolTable()
    const compilationEngine = new CompilationEngine(
      SymbolTableMockData.FIELD_JACK,
      new VMWriter(),
      symbolTable
    )

    const expectedClassSymTable = {
      x: getEntryObject('int', KIND_TYPE.FIELD, 0),
      y: getEntryObject('int', KIND_TYPE.FIELD, 1),
      test: getEntryObject('boolean', KIND_TYPE.STATIC, 0)
    }

    const expectedSubroutineSymTable = {
      a: getEntryObject('Array', KIND_TYPE.VAR, 0),
      length: getEntryObject('int', KIND_TYPE.VAR, 1),
      i: getEntryObject('int', KIND_TYPE.VAR, 2),
      sum: getEntryObject('int', KIND_TYPE.VAR, 3),
      age: getEntryObject('int', KIND_TYPE.ARG, 0)
    }

    compilationEngine.compileClass()
    expect(symbolTable.getClassSymbolTable()).toEqual(expectedClassSymTable)
    expect(symbolTable.getSubroutineSymbolTable()).toEqual(expectedSubroutineSymTable)
  })
})

const getEntryObject = (type, kind, index) => {
  return { type, kind, index }
}
