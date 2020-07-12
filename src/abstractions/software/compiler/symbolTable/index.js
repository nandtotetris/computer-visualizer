// eslint-disable-next-line
import { KIND_TYPE } from './types'
import { SEGMENTS } from '../vmWriter/types'

const KIND_TO_SEGMENT_MAPPING = {
  [KIND_TYPE.ARG]: [SEGMENTS.ARGUMENT],
  [KIND_TYPE.FIELD]: [SEGMENTS.THIS],
  [KIND_TYPE.STATIC]: [SEGMENTS.STATIC],
  [KIND_TYPE.VAR]: [SEGMENTS.LOCAL]
}

class SymbolTable {
  constructor () {
    this.initializeSymbolTables()
  }

  reset () {
    this.initializeSymbolTables()
  }

  initializeSymbolTables () {
    this.subroutineSymbolTable = {}
    this.classSymbolTable = {}
  }

  /**
   * Starts a new subroutine scope
   * (i.e., resets the subroutine's symbol table)
   */
  startSubroutine () {
    this.subroutineSymbolTable = {}
  }

  /**
   * Defines a new identifier of a given `name`, `type` and `kind` and assigns
   * it a running index. `STATIC` and `FIELD` identifiers have a class scope,
   * while `ARG` and `VAR` identifiers have a subroutine scope.
   * @param {string} name identifier name
   * @param {string} type identifier type
   * @param {KIND_TYPE} kind kind type(static, field, arg, var)
   */
  define (name, type, kind) {
    const isClassScope = kind === KIND_TYPE.FIELD || kind === KIND_TYPE.STATIC
    const index = this.varCount(kind)
    const entry = { type, kind, index }
    if (isClassScope) return (this.classSymbolTable[name] = entry)
    return (this.subroutineSymbolTable[name] = entry)
  }

  /**
   * Returns the number of variables of a given `kind` already defined
   * in the current scope.
   * @param {KIND_TYPE} kind kind type
   * @returns {number} number of variables of a given `kind`
   */
  varCount (kind) {
    const isClassScope = kind === KIND_TYPE.FIELD || kind === KIND_TYPE.STATIC
    return Object.values(
      isClassScope ? this.classSymbolTable : this.subroutineSymbolTable
    ).filter(t => t.kind === kind).length
  }

  /**
   * Returns the `kind` of the named identifier in the current scope.
   * If the identifier is unknown in the current scope, returns ''
   * @param {string} name identifier name
   * @returns {KIND_TYPE} the `kind` of the named identifier
   */
  kindOf (name) {
    return this.getIdentifierProperty(name, 'kind')
  }

  /**
   * Returns the `type` of the named identifier in the current scope.
   * @param {string} name identifier name
   * @returns {string} the `type` of the named identifier
   */
  typeOf (name) {
    return this.getIdentifierProperty(name, 'type')
  }

  /**
   * Returns the `index` assigned to the named identifier.
   * @param {string} name identifier name
   * @returns {number} the `index` assigned to the named identifier
   */
  indexOf (name) {
    return this.getIdentifierProperty(name, 'index')
  }

  /**
   * Return the identifer property given identifier name and name of the
   * property we want to get.
   * @param {string} name identifier name
   * @param {string} propertyName identifier property(type, kind and index)
   */
  getIdentifierProperty (name, propertyName) {
    const subRoutineObject = this.subroutineSymbolTable[name]
    if (subRoutineObject) return subRoutineObject[propertyName]
    const classProp = this.classSymbolTable[name]
    return classProp && classProp[propertyName]
  }

  /**
   * @returns {Object} class symbol table
   */
  getClassSymbolTable () {
    return this.classSymbolTable
  }

  /**
   * @returns {Object} subroutine symbol table
   */
  getSubroutineSymbolTable () {
    return this.subroutineSymbolTable
  }

  /**
   * Returns the segment name which the given identifier belongs.
   * @param {string} identifier identifier
   */
  segmentOf (identifier) {
    return KIND_TO_SEGMENT_MAPPING[this.kindOf(identifier)]
  }
}

export default SymbolTable
