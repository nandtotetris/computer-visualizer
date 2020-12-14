import { JACK_CODE } from 'components/Compiler/util'
import CompilationEngine from '.'
import SymbolTable from '../symbolTable'
import VMWriter from '../vmWriter'

export default new CompilationEngine(JACK_CODE, new VMWriter(), new SymbolTable())
