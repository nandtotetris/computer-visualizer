import React, { Component } from 'react'
import compInstance from 'abstractions/software/compiler/compilationEngine/instance'
import SymbolTableUI from 'components/SymbolTable'
import VMWriter from 'components/VMWriter'
import { Wrapper } from './styled'
import ParserEditor from 'components/ParserEditor'
import { JACK_CODE } from './util'
import ConceptNote from 'components/ConceptNote'
import { emitter } from 'emitter'

class Compiler extends Component {
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
    this.clock += 1
    setTimeout(() => {
      this.setState({ vmOutput })
    }, this.delay * this.clock)
  }

  updateCompInstanceData = compInstanceData => {
    this.clock += 1
    setTimeout(() => {
      this.setState({ compInstanceData })
    }, this.delay * this.clock)
  }

  componentDidMount () {
    this.tokenizerUnsubscribe = compInstance
      .getTokenizer()
      .subscribe(this.updateTokenIndex)

    this.symbolTableUnsubscribe = compInstance
      .getSymbolTable()
      .subscribe(this.updateSymbolTable)

    this.vmWriterUnsubscribe = compInstance
      .getVMWriter()
      .subscribe(this.updateVMWriter)

    this.compInstanceUnsubscribe = compInstance
      .subscribe(this.updateCompInstanceData)

    emitter.on('clear', this.onClear)
    compInstance.compileClass()
  }

  componentWillUnmount () {
    this.tokenizerUnsubscribe()
    this.symbolTableUnsubscribe()
    this.vmWriterUnsubscribe()
    this.compInstanceUnsubscribe()
    emitter.removeListener('clear', this.onClear)
  }

  render () {
    const { tokens } = compInstance.getTokenizer()
    const { symbolTable, currentTokenIndex, vmOutput, compInstanceData } = this.state
    const currentToken = tokens[currentTokenIndex]
    return (
      <>
        <Wrapper>
          <ParserEditor JACK_CODE={JACK_CODE} currentToken={currentToken} />
          <ConceptNote compInstanceData={compInstanceData} />
          <SymbolTableUI symbolTable={symbolTable} />
          <VMWriter vm={vmOutput} />
        </Wrapper>
      </>
    )
  }
}

export default Compiler
