class Writer {
  constructor () {
    this.xml = ''
  }

  write (token, tokenType) {
    this.xml += `<${tokenType}> ${token} </${tokenType}>\n`
  }

  writeStart () {
    this.xml += '<tokens>\n'
  }

  writeEnd () {
    this.xml += '</tokens>\n'
  }

  getXml () {
    return this.xml.trim()
  }

  reset () {
    this.xml = ''
  }
}

export default Writer
