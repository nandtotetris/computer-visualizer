import React from 'react'
import { Table } from 'antd'
import { Wrapper } from './styled'

const columns = [
  {
    title: 'VM',
    dataIndex: 'vm',
    key: 'vm',
    render: text => <b>{text}</b>
  }
]

const VMWriter = props => {
  const { vm } = props
  const tableData = vm.split('\n').map((o, i) => {
    return {
      key: i,
      vm: o
    }
  })

  return (
    <Wrapper>
      <Table
        columns={columns}
        dataSource={tableData}
        bordered
        pagination={{
          hideOnSinglePage: true
        }}
      />
    </Wrapper>
  )
}

export default React.memo(VMWriter)
