import React, { Component } from 'react'
import { Button, Input, Modal, notification, Tooltip } from 'antd'
import { SearchOutlined, ClearOutlined, SyncOutlined } from '@ant-design/icons'
import { Column, Table, AutoSizer } from 'react-virtualized'
import {
  Header,
  Left,
  Right,
  Wrapper,
  TableWrapper,
  GlobalStyle,
  ButtonMargin,
  HeaderWrapper2
} from './styled'
import 'react-virtualized/styles.css'
import { getAssmFromInstruction } from './util'
import { convertToNumber } from 'abstractions/hardware/ALU/util'

const headerStyle = {
  fontWeight: 'normal',
  fontSize: '14px'
}

class MemUI extends Component {
  constructor (props) {
    super(props)
    this.state = {
      showModal: false,
      currentRowIndex: -2,
      search: 0,
      binaryROMMode: true,
      binaryMemoryMode: true
    }
    this.updateRowData()
  }

  componentDidMount () {
    const { mem } = this.props
    this.memUnSubscribe = mem.subscribe(this.onMemoryChanged)
  }

  componentWillUnmount () {
    this.memUnSubscribe()
  }

  setShowModal = showModal => this.setState({ showModal })

  handleOk = () => {
    this.setShowModal(false)
    this.handleScroll()
  }

  handleCancel = () => this.setShowModal(false)

  handleOnAddressChange = e => {
    const { mem } = this.props
    const address = parseInt(e.target.value)
    if (address > mem.getAddressLimit()) return
    this.setState({ search: address })
  }

  handleScroll = () => {
    const { search } = this.state
    this.setState({ currentRowIndex: search })
  }

  getRowData = () => {
    const { binaryROMMode, binaryMemoryMode } = this.state
    const { mem, type } = this.props
    const showAssm = type === 'ROM' && !binaryROMMode
    const showNumber = !binaryMemoryMode
    return mem.getMemory().map((m, i) => ({
      key: i,
      address: i,
      instruction: showAssm ? getAssmFromInstruction(m) : showNumber ? convertToNumber(m) : m
    }))
  }

  onMemoryChanged = () => {
    this.updateRowData()
    this.forceUpdate()
  }

  updateRowData = () => {
    this.data = this.getRowData()
  }

  handleClearROM = () => {
    const { mem, type } = this.props
    mem.clear()
    this.updateRowData()
    this.setState({ currentRowIndex: 0 }, () => {
      notification.success({
        message: `${type} successfully cleared`
      })
    })
  }

  rowStyle = row => {
    const { currentRowIndex } = this.state
    const { pc, memoryIndex } = this.props
    if (row.index === currentRowIndex) return { backgroundColor: '#7ABFFF' }
    if (
      row.index === pc || row.index === memoryIndex
    ) return { backgroundColor: 'yellow' }
  }

  handleChangeMode = type => {
    const { [type]: val } = this.state
    this.setState({ [type]: !val }, () => {
      this.updateRowData()
      this.forceUpdate()
    })
  }

  render () {
    const { showModal, currentRowIndex } = this.state
    const { type } = this.props
    const colLabel = type === 'Memory' ? 'Value' : 'Instruction'
    const typeText = type === 'ROM' ? 'binaryROMMode' : 'binaryMemoryMode'

    return (
      <>
        <GlobalStyle />
        <Wrapper>
          <HeaderWrapper2>
            <Left><Header>{type}</Header></Left>
            <Right>
              <Tooltip title='Change mode'>
                <ButtonMargin
                  type='primary'
                  onClick={() => this.handleChangeMode(typeText)}
                  shape='circle'
                  icon={<SyncOutlined />}
                />
              </Tooltip>
              <ButtonMargin
                type='primary'
                onClick={this.handleClearROM}
                shape='circle'
                icon={<ClearOutlined />}
              />
              <Button
                type='primary'
                onClick={() => this.setShowModal(true)}
                shape='circle'
                icon={<SearchOutlined />}
              />
              <Modal
                width={300}
                title={`Find ${type}`}
                visible={showModal}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
              >
                <Input
                  placeholder='Enter Address'
                  onChange={this.handleOnAddressChange}
                />
              </Modal>
            </Right>
          </HeaderWrapper2>
          <TableWrapper>
            <AutoSizer>
              {({ height, width }) => (
                <Table
                  width={width}
                  height={height}
                  headerHeight={30}
                  rowHeight={30}
                  rowCount={this.data.length}
                  rowGetter={({ index }) => this.data[index]}
                  rowStyle={this.rowStyle}
                  scrollToIndex={currentRowIndex}
                  scrollToAlignment='center'
                >
                  <Column headerStyle={headerStyle} label='Address' dataKey='address' width={70} />
                  <Column headerStyle={headerStyle} label={colLabel} dataKey='instruction' width={160} />
                </Table>
              )}
            </AutoSizer>
          </TableWrapper>
        </Wrapper>
      </>
    )
  }
}

export default MemUI
