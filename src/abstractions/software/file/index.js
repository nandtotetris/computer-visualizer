// A general File abstraction
class File {
  constructor (fileName, fileContent) {
    this.name = fileName
    this.content = fileContent
  }

  getName () {
    return this.name
  }

  getContent () {
    return this.content
  }
}

export default File
