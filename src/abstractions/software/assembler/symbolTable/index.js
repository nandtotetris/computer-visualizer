import { getPredefinedSymbols } from './utils'

class SymbolTable {
  /**
   * creates a symbol table and initialize it with the predifined symbols
   */
  constructor () {
    this.observers = []
    this.table = {
      ...getPredefinedSymbols()
    }
  }

  subscribe (observer) {
    this.observers.push(observer)
    const index = this.observers.indexOf(observer)
    this.notify()
    return () => this.observers.splice(index, 1)
  }

  notify () {
    this.observers.forEach(observer => observer(JSON.stringify(this.table)))
  }

  /**
   * Add  (symbol, address) pair to the table
   * @param {string} symbol symbol
   * @param {number} address address of the symbol
   */
  addEntry (symbol, address) {
    if (this.contains(symbol)) return
    if (
      symbol && (address || address === 0)
    ) {
      this.table[symbol] = address
      this.notify()
      return
    }
    return new Error(
      `Error in symbolTable.addEntry. For symbol=${symbol} and address=${address}`)
  }

  /**
   *
   * @param {string} symbol symbol
   * @returns {boolean} does the symbol table contain the given symbol?
   */
  contains (symbol) {
    /*
    - Not all objects inherit from Object.prototype
    - Even for the objects which inherit from Object.prototype,
    the hasOwnProperty method could be shadowed by sth else.
    So better not to call `ths.table.hasOwnProperty(symbol)`
    */
    return Object.hasOwnProperty.call(this.table, symbol)
  }

  /**
   *
   * @param {string} symbol symbol
   * @returns {address} the address associated with the symbol
   */
  getAdress (symbol) {
    if (!this.contains(symbol)) return
    return this.table[symbol]
  }

  /**
   * @returns {Object} table
   */
  getTable () {
    return this.table
  }
}

export default SymbolTable
