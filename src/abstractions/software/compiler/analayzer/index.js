import Writer from '../writer'
import File from '../../file'
import CompilationEngine from '../compilationEngine'

class JackAnalayzer {
  /** @type {File []} */
  constructor (files) {
    this.files = files
    this.writer = new Writer()
  }

  /**
   * @returns {File []} tokenized files
   */
  analayze () {
    const results = []
    const { writer, files } = this
    let compilationEngine = null
    files.forEach(file => {
      writer.reset()
      compilationEngine = new CompilationEngine(file.getContent(), writer)
      compilationEngine.compileClass()
      results.push(new File(file.getName(), writer.getXml()))
    })

    return results
  }
}

export default JackAnalayzer
