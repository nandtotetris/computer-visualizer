import React, { Component } from 'react'
import { Table } from 'antd'
import scrollIntoView from 'scroll-into-view'
import { TableWrapper } from './styled'

const columns = [
  {
    title: 'Symbol Table',
    dataSource: 'symbolTable',
    children: [
      {
        title: 'variable',
        dataIndex: 'variable'
      },
      {
        title: 'address',
        dataIndex: 'address'
      }
    ]
  }
]

class SymbolTableUI extends Component {
  state = {
    rows: []
  }

  componentDidMount () {
    const { symbolTable } = this.props

    symbolTable.subscribe(this.updateSymbolTable)
  }

  updateSymbolTable = data => {
    const parsedSymbolTable = JSON.parse(data)
    const rows = Object.keys(parsedSymbolTable).map((k, i) => {
      return {
        key: i,
        variable: k,
        address: parsedSymbolTable[k]
      }
    })
    this.setState({ rows }, () => this.handleScroll())
  }

  handleScroll = () => {
    scrollIntoView(document.querySelector('.sym-table-scroll-row'), {
      align: {
        top: 0
      }
    })
  }

  render () {
    const { rows } = this.state
    return (
      <TableWrapper>
        <Table
          bordered
          columns={columns}
          dataSource={rows}
          pagination={false}
          scroll={{ y: 535 }}
          rowClassName={(record, index) => (index === rows.length - 1 ? 'sym-table-scroll-row' : '')}
        />
      </TableWrapper>
    )
  }
}

export default SymbolTableUI
