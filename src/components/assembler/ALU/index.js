import { Modal, Table, Tooltip } from 'antd'
import Alu from 'components/ALU'
import React, { useState } from 'react'
import {
  ContentWrapper,
  Wrapper,
  Header,
  InputsWrapper,
  WMBInput,
  InputWrapper,
  Span,
  OperationWrapper,
  GlobalStyle,
  InstructionWrapper
} from './styled'
import { ALU_MAPPING, replaceByIndex } from './util'

const columns = [
  {
    title: 'zx',
    dataIndex: 'zx',
    width: 20
  },
  {
    title: 'nx',
    dataIndex: 'nx',
    width: 20
  },
  {
    title: 'zy',
    dataIndex: 'zy',
    width: 20
  },
  {
    title: 'ny',
    dataIndex: 'ny',
    width: 20
  },
  {
    title: 'f',
    dataIndex: 'f',
    width: 20
  },
  {
    title: 'no',
    dataIndex: 'no',
    width: 20
  },
  {
    title: 'out',
    dataIndex: 'out',
    width: 20,
    render: txt => <b>{txt}</b>
  }
]

const getTableRows = () => {
  return Object.keys(ALU_MAPPING).map((k, i) => {
    return {
      key: i,
      zx: k[0],
      nx: k[1],
      zy: k[2],
      ny: k[3],
      f: k[4],
      no: k[5],
      out: ALU_MAPPING[k],
      all: k
    }
  })
}

const ALUUI = props => {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const { a, b, aluOutput, operation, cInstruction } = props

  const controlBits = cInstruction ? cInstruction.getControlBits() : ''
  const instruction = cInstruction ? cInstruction.instruction : ''

  const showModal = () => setIsModalVisible(true)
  const closeModal = () => setIsModalVisible(false)

  return (
    <Wrapper>
      <GlobalStyle />
      <Header>ALU</Header>
      <ContentWrapper>
        <InputsWrapper>
          <InputWrapper>
            <Span>D Input</Span>
            <WMBInput value={a} />
          </InputWrapper>
          <InputWrapper>
            <Span>M/A Input</Span>
            <WMBInput value={b} />
          </InputWrapper>
        </InputsWrapper>
        <OperationWrapper onClick={showModal}>{operation}</OperationWrapper>
        <InputWrapper>
          <Span>ALU output</Span>
          <WMBInput value={aluOutput} />
        </InputWrapper>
      </ContentWrapper>
      <Modal
        style={{ top: 10 }}
        title='ALU'
        visible={isModalVisible}
        onOk={closeModal}
        onCancel={closeModal}
        width={600}
        footer={null}
      >
        {
          instruction && (
            <>
              <Header>Instruction</Header>
              <Tooltip title='Selector bits'>
                <InstructionWrapper dangerouslySetInnerHTML={{ __html: replaceByIndex(4, 9, instruction) }} />
              </Tooltip>
            </>
          )
        }
        <Alu a={a} b={b} controlBits={controlBits} output={aluOutput} />
        <Table
          className='alu-table'
          size='small'
          bordered
          columns={columns}
          dataSource={getTableRows()}
          pagination={false}
          scroll={{
            y: 500
          }}
          rowClassName={({ all }, i) => {
            return all === controlBits ? 'highlight-alu' : ''
          }}
        />
      </Modal>
    </Wrapper>
  )
}

export default ALUUI
