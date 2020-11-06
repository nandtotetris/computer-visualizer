class Writer {
  constructor () {
    this.xml = ''
  }

  write (token, tokenType) {
    this.xml += `<${tokenType}> ${token} </${tokenType}>\n`
  }

  writeStart (type) {
    this.xml += `<${type}>\n`
  }

  writeEnd (type) {
    this.xml += `</${type}>\n`
  }

  getXml () {
    return this.xml.trim()
  }

  reset () {
    this.xml = ''
  }
}

export default Writer
