import JackTokenizer from '../tokenizer'
import Writer from '../writer'
import File from '../../file'
import { TOKEN_TYPE } from '../tokenizer/types'

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
    files.forEach(file => {
      writer.reset()
      const jackTokenizer = new JackTokenizer(file.getContent())

      writer.writeStart()
      while (jackTokenizer.hasMoreTokens()) {
        jackTokenizer.advance()
        const tokenType = jackTokenizer.tokenType()
        switch (tokenType) {
          case TOKEN_TYPE.KEYWORD:
            writer.write(jackTokenizer.keyword(), tokenType)
            break
          case TOKEN_TYPE.SYMBOL:
            writer.write(jackTokenizer.symbol(), tokenType)
            break
          case TOKEN_TYPE.INTEGER_CONSTANT:
            writer.write(jackTokenizer.intVal(), tokenType)
            break
          case TOKEN_TYPE.STRING_CONSTANT:
            writer.write(jackTokenizer.stringVal(), tokenType)
            break
          case TOKEN_TYPE.IDENTIFIER:
            writer.write(jackTokenizer.identifier(), tokenType)
            break
        }
      }
      writer.writeEnd()

      results.push(new File(file.getName(), writer.getXml()))
    })

    return results
  }
}

export default JackAnalayzer
