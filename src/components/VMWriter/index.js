import React from 'react'
import { Table } from 'antd'
import { ItemWrapper } from 'components/Compiler/styled'

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
    <ItemWrapper style={{ marginLeft: '25px', width: '200px' }}>
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

export default React.memo(VMWriter)
