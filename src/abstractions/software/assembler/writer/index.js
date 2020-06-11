class Writer {
  constructor () {
    this.machineCode = ''
  }

  write (instruction) {
    this.machineCode += instruction + '\n'
  }

  getResult () {
    return this.machineCode.trim()
  }
}

export default Writer
