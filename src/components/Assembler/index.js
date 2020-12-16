import React, { Component } from 'react'
import CodeEditor from 'components/CodeEditor'
import { MainWrapper, NextButtonWrapper, Wrapper } from './styled'
import { MainContext } from 'contexts'
import SymbolTable from 'abstractions/software/assembler/symbolTable'
import Writer from 'abstractions/software/assembler/writer'
import FirstPass from './FirstPass'
import SymbolTableUI from './SymbolTableUI'
import Header from 'components/Header'
import { HeaderWrapper } from './SecondPass/styled'
import { TealButton } from 'components/Buttons'
import { Link } from 'react-router-dom'
import { ROUTINGS } from 'constants/routing'

class Assembler extends Component {
  componentDidMount () {
    this.symbolTable = new SymbolTable()
    this.writer = new Writer()
    this.forceUpdate()
  }

  render () {
    if (!this.symbolTable || !this.writer) return null

    const { state: { assembly } } = this.context
    return (
      <>
        <HeaderWrapper>
          <Header>Assembler first pass</Header>
        </HeaderWrapper>
        <NextButtonWrapper>
          <Link to={ROUTINGS.ASSEMBLER_SECOND_PASS}><TealButton>Next Stage</TealButton></Link>
        </NextButtonWrapper>
        <MainWrapper>
          <Wrapper>
            <CodeEditor code={assembly} width={400} />
            <SymbolTableUI symbolTable={this.symbolTable} />
            <FirstPass symbolTable={this.symbolTable} />
          </Wrapper>
        </MainWrapper>
      </>
    )
  }
}

Assembler.contextType = MainContext

export default Assembler
