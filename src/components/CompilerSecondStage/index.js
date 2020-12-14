import React, { Component } from 'react'
import VMWriter from 'abstractions/software/compiler/vmWriter'
import emitter from 'components/Emitter'
import { MainContext } from 'contexts'
import CompilationEngine from 'abstractions/software/compiler/compilationEngine'
import SymbolTable from 'abstractions/software/compiler/symbolTable'
import { Wrapper, MainWrapper } from './styled'
import ParserEditor from 'components/ParserEditor'
import ConceptNote from 'components/ConceptNote'
import SymbolTableUI from 'components/SymbolTable'
import VMWriterUI from 'components/VMWriter'
import Header from 'components/Header'

class CompilerSecondStage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      currentTokenIndex: -1,
      symbolTable: {},
      vmOutput: '',
      compInstanceData: {}
    }
    this.clock = 0
    this.delay = 800
  }

  onClear = () => {
    this.clock = 0
  }

  updateTokenIndex = currentTokenIndex => {
    this.clock += 1
    setTimeout(() => {
      this.setState({ currentTokenIndex })
    }, this.delay * this.clock)
  }

  updateSymbolTable = symbolTable => {
    this.clock += 1
    setTimeout(() => {
      this.setState({ symbolTable: JSON.parse(symbolTable) })
    }, this.delay * this.clock)
  }

  updateVMWriter = vmOutput => {
    const { actions: { setVM } } = this.context
    this.clock += 1
    setTimeout(() => {
      this.setState({ vmOutput }, () => setVM(vmOutput))
    }, this.delay * this.clock)
  }

  updateCompInstanceData = compInstanceData => {
    this.clock += 1
    setTimeout(() => {
      this.setState({ compInstanceData })
    }, this.delay * this.clock)
  }

  componentDidMount () {
    const { state: { jackCode } } = this.context
    this.compInstance = new CompilationEngine(jackCode, new VMWriter(), new SymbolTable())
    this.forceUpdate()
    this.tokenizerUnsubscribe = this.compInstance
      .getTokenizer()
      .subscribe(this.updateTokenIndex)

    this.symbolTableUnsubscribe = this.compInstance
      .getSymbolTable()
      .subscribe(this.updateSymbolTable)

    this.vmWriterUnsubscribe = this.compInstance
      .getVMWriter()
      .subscribe(this.updateVMWriter)

    this.compInstanceUnsubscribe = this.compInstance
      .subscribe(this.updateCompInstanceData)

    emitter.on('clear', this.onClear)
    this.compInstance.compileClass()
  }

  componentWillUnmount () {
    this.tokenizerUnsubscribe()
    this.symbolTableUnsubscribe()
    this.vmWriterUnsubscribe()
    this.compInstanceUnsubscribe()
    emitter.removeListener('clear', this.onClear)
  }

  handleClick () {
    emitter.emit('next')
  }

  render () {
    if (!this.compInstance) return null
    const { state: { jackCode } } = this.context
    const { tokens } = this.compInstance.getTokenizer()
    const { currentTokenIndex, compInstanceData, symbolTable, vmOutput } = this.state
    const currentToken = tokens[currentTokenIndex]
    return (
      <MainWrapper>
        <Header>Compiler Stage II (Compilation Engine)</Header>
        <Wrapper>
          <ParserEditor JACK_CODE={jackCode} currentToken={currentToken} />
          <ConceptNote compInstanceData={compInstanceData} />
          <SymbolTableUI symbolTable={symbolTable} />
          <VMWriterUI vm={vmOutput} />
        </Wrapper>
      </MainWrapper>
    )
  }
}

CompilerSecondStage.contextType = MainContext

export default CompilerSecondStage
