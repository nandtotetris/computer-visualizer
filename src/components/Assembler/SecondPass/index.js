import React, { Component } from 'react'
import Parser from 'abstractions/software/assembler/parser'
import { Wrapper, MainWrapper, HeaderWrapper, NextButtonWrapper } from './styled'
import Code from 'abstractions/software/assembler/code'
import SymbolTable from 'abstractions/software/assembler/symbolTable'
import { COMMAND_TYPE } from 'abstractions/software/assembler/parser/types'
import { MainContext } from 'contexts'
import SymbolTableUI from '../SymbolTableUI'
import { ButtonsWrapper, TableWrapper, Text } from '../FirstPass/styled'
import { AutoSizer, Column, Table } from 'react-virtualized'
import { GlobalStyle } from 'components/CPU/MemUI/styled'
import { TealButton } from 'components/Buttons'
import Writer from 'abstractions/software/assembler/writer'
import InstructionsUI from './Instructions'
import Header from 'components/Header'
import { Link } from 'react-router-dom'
import { ROUTINGS } from 'constants/routing'

const headerStyle = {
  fontWeight: 'normal',
  fontSize: '14px'
}

class SecondPass extends Component {
  state = {
    currentIndex: 0,
    currentInstruction: '',
    machineCodes: []
  }

  componentDidMount () {
    const { state: { assembly } } = this.context
    this.parser = new Parser(assembly)
    this.RAMAddress = 16
    this.instructions = [...this.parser.instructions]
    this.parser.advance()
    this.code = new Code()
    this.writer = new Writer()
    this.symbolTable = new SymbolTable()

    // Add all labels to the symbol table before the second assembly stage begins
    this.firstPass()

    this.writer.subscribe(this.updateOutput)
    this.forceUpdate()
  }

  updateOutput = data => {
    const { actions: { setMachineCode } } = this.context
    const machineCodes = data.split('\n').filter(Boolean)
    this.setState({ machineCodes }, () => setMachineCode(machineCodes))
  }

  incrementCurrentIndex = () => {
    const { currentIndex } = this.state
    this.setState({ currentIndex: currentIndex + 1 })
  }

  firstPass = () => {
    const { state: { assembly } } = this.context
    const parser = new Parser(assembly)
    const { symbolTable } = this
    let ROMAddress = 0

    parser.advance()
    while (parser.getCurrentCommand()) {
      const commandType = parser.commandType()
      if (commandType !== COMMAND_TYPE.L_COMMAND) ROMAddress++
      else symbolTable.addEntry(parser.symbol(), ROMAddress)
      parser.advance()
    }
  }

  rowStyle = row => {
    const { currentIndex } = this.state
    if (row.index === currentIndex) return { backgroundColor: 'yellow' }
  }

  handleNext = () => {
    const { parser, code, writer } = this

    if (!parser.getCurrentCommand()) return
    const commandType = parser.commandType()

    let instruction

    if (commandType === COMMAND_TYPE.A_COMMAND) {
      const address = this.getAddress(parser.symbol())
      instruction = code.getAInstructionMachineCode(address)
      writer.write(instruction)
    }

    if (commandType === COMMAND_TYPE.C_COMMAND) {
      instruction = code.getCInstructionMachineCode(
        parser.comp(), parser.dest(), parser.jump())
      this.writer.write(instruction)
    }

    this.setState({ currentInstruction: instruction })
    parser.advance()
    this.incrementCurrentIndex()
  }

  getAddress = symbol => {
    // if is number return it
    if (!isNaN(symbol)) return symbol
    if (
      this.symbolTable.contains(symbol)
    ) return this.symbolTable.getAdress(symbol)
    this.symbolTable.addEntry(symbol, this.RAMAddress++)
    return this.symbolTable.getAdress(symbol)
  }

  render () {
    if (!this.parser) return null

    const { currentIndex, currentInstruction, machineCodes } = this.state

    const rows = this.instructions.map((k, i) => {
      return {
        key: i,
        assembly: k
      }
    })

    const machineCodeData = machineCodes.map((k, i) => {
      return {
        key: i,
        machineCode: k
      }
    })

    return (
      <>
        <HeaderWrapper>
          <Header>Assembler second pass</Header>
        </HeaderWrapper>
        <NextButtonWrapper>
          <Link to={ROUTINGS.CPU}><TealButton>Go to CPU</TealButton></Link>
        </NextButtonWrapper>
        <MainWrapper>
          <GlobalStyle />
          <SymbolTableUI symbolTable={this.symbolTable} />
          <Wrapper>
            <ButtonsWrapper>
              <Text>Second pass</Text>
              <TealButton onClick={this.handleNext} mb={10}>Execute</TealButton>
            </ButtonsWrapper>
            <TableWrapper>
              <AutoSizer>
                {({ height, width }) => (
                  <Table
                    width={width}
                    height={height}
                    headerHeight={30}
                    rowHeight={30}
                    rowCount={rows.length}
                    rowGetter={({ index }) => rows[index]}
                    rowStyle={this.rowStyle}
                    scrollToIndex={currentIndex}
                    scrollToAlignment='center'
                  >
                    <Column headerStyle={headerStyle} label='Assembly' dataKey='assembly' width={150} />
                  </Table>
                )}
              </AutoSizer>
            </TableWrapper>
          </Wrapper>
          <InstructionsUI instruction={currentInstruction} />
          <Wrapper>
            <TableWrapper>
              <AutoSizer>
                {({ height, width }) => (
                  <Table
                    width={width}
                    height={height}
                    headerHeight={30}
                    rowHeight={30}
                    rowCount={machineCodeData.length}
                    rowGetter={({ index }) => machineCodeData[index]}
                  >
                    <Column headerStyle={headerStyle} label='Machine Code' dataKey='machineCode' width={150} />
                  </Table>
                )}
              </AutoSizer>
            </TableWrapper>
          </Wrapper>
        </MainWrapper>
      </>
    )
  }
}

SecondPass.contextType = MainContext

export default SecondPass
