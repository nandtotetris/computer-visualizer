import JackTokenizer from 'abstractions/software/compiler/tokenizer'
import { Table, Tooltip } from 'antd'
import Badge from 'components/Badge'
import React, { useEffect, useState } from 'react'
import { Wrapper } from './styled'

const columns = [
  {
    title: 'Token',
    dataIndex: 'token',
    key: 'token',
    render: txt => <span style={{ fontSize: '16px' }}>{txt}</span>
  }
]

const Tokenizer = props => {
  const [rows, setRows] = useState([])
  const { code, badgeText, tooltipText } = props

  useEffect(() => {
    const tokenizer = new JackTokenizer(code)
    const tokens = tokenizer.tokens.map(t => ({
      token: t.value()
    }))

    setRows(tokens)
  }, [code])

  return (
    <Wrapper>
      <Badge badgeText={<Tooltip title={tooltipText}>{badgeText}</Tooltip>} />
      <Table scroll={{ y: 540 }} pagination={false} bordered columns={columns} dataSource={rows} />
    </Wrapper>
  )
}

export default Tokenizer
