import File from '../../file'
import CompilationEngine from '../compilationEngine'
import VMWriter from '../vmWriter'
import SymbolTable from '../symbolTable'

class JackAnalyzer {
  /** @type {File []} */
  constructor (files) {
    this.files = files
  }

  /**
   * @returns {File []} tokenized files
   */
  analayze () {
    const results = []
    const { files } = this
    const vmWriter = new VMWriter()
    const symbolTable = new SymbolTable()
    let compilationEngine = null
    files.forEach(file => {
      vmWriter.reset()
      symbolTable.reset()

      compilationEngine = new CompilationEngine(file.getContent(), vmWriter, symbolTable)
      compilationEngine.compileClass()
      results.push(new File(file.getName(), vmWriter.getVM()))
    })

    return results
  }
}

export default JackAnalyzer
