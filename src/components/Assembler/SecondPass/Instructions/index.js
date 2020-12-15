import { COMPUTE_CODES, DESTIONATION_CODES, JUMP_CODES } from 'abstractions/software/assembler/code'
import { Modal, Table } from 'antd'
import React, { useState } from 'react'
import AInstruction from './AInstruction'
import CInstruction from './CInstruction'
import Example from './Example'
import { Button, CompModalTable, GlobalStyle, ModalTableWrapper, Wrapper } from './styled'

const compColumns = [
  {
    title: 'Comp',
    children: [
      {
        title: 'Mnemonic',
        dataIndex: 'mnemonic'
      },
      {
        title: 'Value',
        dataIndex: 'value'
      }
    ]
  }
]

const destColumns = [
  {
    title: 'Dest',
    children: [
      {
        title: 'Mnemonic',
        dataIndex: 'mnemonic'
      },
      {
        title: 'Value',
        dataIndex: 'value'
      }
    ]
  }
]

const jumpColumns = [
  {
    title: 'Jump',
    children: [
      {
        title: 'Mnemonic',
        dataIndex: 'mnemonic'
      },
      {
        title: 'Value',
        dataIndex: 'value'
      }
    ]
  }
]

const compData = Object.keys(COMPUTE_CODES).map((c, i) => {
  return {
    key: i,
    mnemonic: c,
    value: COMPUTE_CODES[c]
  }
})

const destData = Object.keys(DESTIONATION_CODES).map((c, i) => {
  return {
    key: i,
    mnemonic: c,
    value: DESTIONATION_CODES[c]
  }
})

const jumpData = Object.keys(JUMP_CODES).map((c, i) => {
  return {
    key: i,
    mnemonic: c,
    value: JUMP_CODES[c]
  }
})

const InstructionsUI = props => {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const { instruction } = props

  const showModal = () => setIsModalVisible(true)
  const handleOk = () => setIsModalVisible(false)
  const handleCancel = () => setIsModalVisible(false)

  if (!instruction) return <Wrapper />
  const isAInstruction = instruction[0] === '0'

  const compute = instruction.slice(3, 10)
  const dest = instruction.slice(10, 13)
  const jump = instruction.slice(13)

  return (
    <Wrapper>
      <GlobalStyle />
      <Example isAInstruction={isAInstruction} />
      {
        isAInstruction
          ? <AInstruction instruction={instruction} />
          : <CInstruction instruction={instruction} />
      }
      {!isAInstruction && <Button onClick={showModal}>How</Button>}
      <Modal
        className='assembly-modal'
        style={{ top: 20 }}
        title='Mnemonic machine code'
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        width={800}
        footer={null}
      >
        <ModalTableWrapper>
          <CompModalTable>
            <Table
              className='instruction'
              columns={compColumns}
              dataSource={compData}
              bordered
              scroll={{
                y: 300
              }}
              pagination={false}
              rowClassName={({ value }, i) => {
                return value === compute ? 'highlight-instr-row' : ''
              }}
            />
          </CompModalTable>
          <CompModalTable>
            <Table
              className='instruction'
              columns={destColumns}
              dataSource={destData}
              bordered
              scroll={{
                y: 300
              }}
              pagination={false}
              rowClassName={({ value }, i) => {
                return value === dest ? 'highlight-instr-row' : ''
              }}
            />
          </CompModalTable>
          <CompModalTable>
            <Table
              className='instruction'
              columns={jumpColumns}
              dataSource={jumpData}
              bordered
              scroll={{
                y: 300
              }}
              pagination={false}
              rowClassName={({ value }, i) => {
                return value === jump ? 'highlight-instr-row' : ''
              }}
            />
          </CompModalTable>
        </ModalTableWrapper>
      </Modal>
    </Wrapper>
  )
}

export default InstructionsUI
