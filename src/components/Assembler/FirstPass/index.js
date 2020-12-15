import React, { Component } from 'react'
import { Wrapper, TableWrapper, ButtonsWrapper, Text } from './styled'
import Parser from 'abstractions/software/assembler/parser'
import { MainContext } from 'contexts'
import { COMMAND_TYPE } from 'abstractions/software/assembler/parser/types'
import { AutoSizer, Column, Table } from 'react-virtualized'
import { TealButton } from 'components/Buttons'
import { GlobalStyle } from 'components/CPU/MemUI/styled'

const headerStyle = {
  fontWeight: 'normal',
  fontSize: '14px'
}

class FirstPass extends Component {
  state = {
    currentIndex: 0
  }

  componentDidMount () {
    const { state: { assembly } } = this.context
    this.parser = new Parser(assembly)
    this.ROMAddress = 0
    this.instructions = [...this.parser.instructions]
    this.parser.advance()
    this.forceUpdate()
  }

  incrementCurrentIndex = () => {
    const { currentIndex } = this.state
    this.setState({ currentIndex: currentIndex + 1 })
  }

  rowStyle = row => {
    const { currentIndex } = this.state
    if (row.index === currentIndex) return { backgroundColor: 'yellow' }
  }

  handleNext = () => {
    const { parser } = this
    const { symbolTable } = this.props

    if (!parser.getCurrentCommand()) return

    const commandType = parser.commandType()
    if (commandType !== COMMAND_TYPE.L_COMMAND) this.ROMAddress++
    else symbolTable.addEntry(parser.symbol(), this.ROMAddress)
    parser.advance()
    this.incrementCurrentIndex()
  }

  render () {
    if (!this.parser) return null
    const { currentIndex } = this.state
    const rows = this.instructions.map((k, i) => {
      return {
        key: i,
        assembly: k
      }
    })

    return (
      <Wrapper>
        <GlobalStyle />
        <ButtonsWrapper>
          <Text>First pass</Text>
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
    )
  }
}

FirstPass.contextType = MainContext

export default FirstPass
