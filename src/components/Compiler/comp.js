import CompilationEngine from 'abstractions/software/compiler/compilationEngine'
import SymbolTable from 'abstractions/software/compiler/symbolTable'
import VMWriter from 'abstractions/software/compiler/vmWriter'
import { JACK_CODE } from './util'

let comp

const getCompilationEngine = callbacks => {
  if (comp) return comp
  return new CompilationEngine(JACK_CODE, new VMWriter(), new SymbolTable(), callbacks)
}

export default getCompilationEngine
