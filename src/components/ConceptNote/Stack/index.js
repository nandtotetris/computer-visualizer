import React, { useState } from 'react'
import { Button, Modal, Table } from 'antd'
import { Grammar, GrammarWrapper } from '../styled'
import {
  GlobalStyle,
  Wrapper,
  Item,
  MainWrapper,
  ButtonWrapper,
  TextWrapper,
  Header,
  Code
} from './styled'
import { SCOPE_CONTENT, SCOPE_TO_GRAMMAR_MAPPING, SCOPE_TO_HIGHLIGHT_MAPPING } from '../util'
import { CaretDownOutlined } from '@ant-design/icons'

const columns = [
  {
    title: 'syntax',
    dataIndex: 'syntax',
    key: 'syntax',
    width: 200
  },
  {
    title: 'value',
    dataIndex: 'value',
    key: 'value',
    render: txt => <code>{txt}</code>
  }
]

const Stack = props => {
  const { scopes } = props
  const [isModalVisible, setIsModalVisible] = useState(false)

  const openModal = () => setIsModalVisible(true)
  const handleOk = () => setIsModalVisible(false)
  const handleCancel = () => setIsModalVisible(false)

  const finalScopes = JSON.parse(scopes || '[]').reverse()
  const latestScope = finalScopes.length ? finalScopes[0] : ''
  const latestScopeRemovedSpace = latestScope.replaceAll(' ', '')

  const tableData = Object.keys(SCOPE_TO_GRAMMAR_MAPPING).map((k, i) => {
    return {
      syntax: k.replace('compile', ''),
      value: SCOPE_TO_GRAMMAR_MAPPING[k]
    }
  })

  const onStackItemClick = scope => {
    const content = SCOPE_CONTENT[scope.replaceAll(' ', '')]
    Modal.info({
      title: scope,
      content: <div dangerouslySetInnerHTML={{ __html: content }} />
    })
  }

  const currentGrammar = SCOPE_TO_GRAMMAR_MAPPING[latestScopeRemovedSpace]

  return (
    <>
      <GlobalStyle />
      <MainWrapper>
        <ButtonWrapper>
          <Button onClick={openModal} icon={<CaretDownOutlined />}>Next Command Grammar</Button>
        </ButtonWrapper>
        <GrammarWrapper>
          <Grammar>{currentGrammar}</Grammar>
        </GrammarWrapper>
        <Wrapper>
          {
            finalScopes.map((scope, i) => {
              return <Item onClick={() => onStackItemClick(scope)} key={i}>{scope}</Item>
            })
          }
        </Wrapper>
      </MainWrapper>
      <Modal
        className='grammar-modal'
        style={{ top: 0 }}
        title='Grammar'
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        width={800}
        footer={null}
      >
        <TextWrapper>
          <Header>Next command: <Code>{currentGrammar}</Code></Header>
        </TextWrapper>
        <Table
          columns={columns}
          dataSource={tableData}
          bordered
          className='grammar-table'
          scroll={{
            y: 700
          }}
          pagination={false}
          rowClassName={(row, i) => {
            const currentGrammarHightlights = SCOPE_TO_HIGHLIGHT_MAPPING[latestScopeRemovedSpace]
            return currentGrammarHightlights.includes(i) ? 'high-light-row' : ''
          }}
        />
      </Modal>
    </>
  )
}

export default Stack
