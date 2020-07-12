import VMWriter from '../vmWriter'
import CompilationEngine from '.'
import { CodeGeneration } from '../mockData'
import SymbolTable from '../symbolTable'

describe('compilationEngine class executable VM', () => {
  const vmWritter = new VMWriter()
  const symbolTable = new SymbolTable()

  const newCompilationEngine = jackCode => {
    return new CompilationEngine(jackCode, vmWritter, symbolTable)
  }

  afterEach(() => {
    vmWritter.reset()
    symbolTable.reset()
  })

  it('should properly handle constructors', () => {
    const compilationEngine = newCompilationEngine(CodeGeneration.CONSTRUCTOR_JACK)
    compilationEngine.compileClass()
    expect(vmWritter.getVM()).toBe(CodeGeneration.CONSTRUCTOR_VM.trim())
  })

  it('should properly handle strings', () => {
    const compilationEngine = newCompilationEngine(CodeGeneration.STRING_JACK)
    compilationEngine.compileClass()
    expect(vmWritter.getVM()).toBe(CodeGeneration.STRING_VM.trim())
  })

  // let arr[i] = 5
  it('should properly handle array variables', () => {
    const compilationEngine = newCompilationEngine(CodeGeneration.ARRAY_VARIABLE_JACK)
    compilationEngine.compileClass()
    expect(vmWritter.getVM()).toBe(CodeGeneration.ARRAY_VARIABLE_VM.trim())
  })

  // let a = arr[3]
  it('should propery handle array values', () => {
    const compilationEngine = newCompilationEngine(CodeGeneration.ARRAY_VALUE_JACK)
    compilationEngine.compileClass()
    expect(vmWritter.getVM()).toBe(CodeGeneration.ARRAY_VALUE_VM.trim())
  })

  it('should throw an exception if identifier is not found in both symbol tables', () => {
    const compilationEngine = newCompilationEngine(CodeGeneration.UNDEFINED_VARIABLE_JACK)

    let error = null
    try {
      compilationEngine.compileClass()
    } catch (e) {
      error = e
      expect(e.message).toBe(`In subroutine main: age is not defined as a field,
      parameter or local or static variable`)
    }
    expect(error).toBeTruthy()
  })
})
