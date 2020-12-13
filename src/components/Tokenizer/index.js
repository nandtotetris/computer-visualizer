import JackTokenizer from 'abstractions/software/compiler/tokenizer'
import { Table, Tooltip } from 'antd'
import scrollIntoView from 'scroll-into-view'
import Badge from 'components/Badge'
import React, { useEffect, useState } from 'react'
import { Wrapper } from './styled'
import { useMainContextStates } from 'contexts'

const columns = [
  {
    title: 'Token',
    dataIndex: 'token',
    key: 'token',
    render: txt => <span style={{ fontSize: '16px' }}>{txt}</span>
  },
  {
    title: 'Type',
    dataIndex: 'type',
    key: 'type',
    render: txt => <span style={{ fontSize: '16px' }}>{txt.toUpperCase()}</span>
  }
]

const Tokenizer = props => {
  const [rows, setRows] = useState([])
  const { tokenizerDelay } = useMainContextStates()
  const { code, badgeText, tooltipText } = props

  useEffect(() => {
    const tokenizer = new JackTokenizer(code)
    tokenizer.tokens.forEach((token, i) => {
      setTimeout(() => {
        setRows(oldRows => [
          ...oldRows,
          { key: i, token: token.value(), type: token.type() }
        ])
      }, tokenizerDelay * i)
    })
  }, [code, tokenizerDelay])

  useEffect(() => {
    handleScroll()
  }, [rows])

  const handleScroll = () => {
    scrollIntoView(document.querySelector('.scroll-row'), {
      align: { top: 0 }
    })
  }

  return (
    <Wrapper>
      <Badge badgeText={<Tooltip title={tooltipText}>{badgeText}</Tooltip>} />
      <Table
        scroll={{ y: 540 }}
        pagination={false}
        bordered
        columns={columns}
        dataSource={rows}
        rowClassName={(record, i) => i === rows.length - 1 ? 'scroll-row' : ''}
      />
    </Wrapper>
  )
}

export default Tokenizer
