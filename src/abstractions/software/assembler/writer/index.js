class Writer {
  constructor () {
    this.observers = []
    this.machineCode = ''
  }

  subscribe (observer) {
    this.observers.push(observer)
    const index = this.observers.indexOf(observer)
    return () => this.observers.splice(index, 1)
  }

  notify () {
    this.observers.forEach(observer => observer(this.machineCode))
  }

  write (instruction) {
    this.machineCode += instruction + '\n'
    this.notify()
  }

  getResult () {
    return this.machineCode.trim()
  }
}

export default Writer
