import React from 'react'
import { Table } from 'antd'
import { ItemWrapper } from 'components/Compiler/styled'

const columns = [
  {
    title: 'Current',
    dataIndex: 'current',
    key: 'current',
    width: 50
  },
  {
    title: 'Token',
    dataIndex: 'token',
    key: 'token'
  },
  {
    title: 'Type',
    dataIndex: 'type',
    key: 'type'
  }
]

const Parser = props => {
  const { currentTokenIndex, tokens } = props

  const tableData = tokens.map((token, i) => {
    return {
      key: i,
      current: currentTokenIndex === i ? '--→' : '',
      token: token.value(),
      type: token.type().toUpperCase()
    }
  })

  return (
    <ItemWrapper>
      <Table
        columns={columns}
        dataSource={tableData}
        bordered
        pagination={{
          hideOnSinglePage: true
        }}
      />
    </ItemWrapper>
  )
}

export default React.memo(Parser)
