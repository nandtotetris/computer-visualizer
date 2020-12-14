import React from 'react'
import { Table } from 'antd'
import {
  Wrapper,
  TableWrapper
} from './styled'
import Stack from './Stack'

const columnsStyle = {
  fontSize: '18px'
}

const columns = [
  {
    title: 'Class Name',
    dataIndex: 'className',
    render: text => <span style={columnsStyle}>{text}</span>
  },
  {
    title: 'Current Subroutine',
    dataIndex: 'currentSubroutine',
    children: [
      {
        title: 'Name',
        dataIndex: 'subroutineName',
        render: text => <span style={columnsStyle}>{text}</span>
      },
      {
        title: 'Type',
        dataIndex: 'subroutineType',
        render: text => <span>{text}</span>
      },
      {
        title: 'Var count',
        dataIndex: 'varCount',
        render: text => <span>{text}</span>
      }
    ]
  }
]

const ConceptNote = props => {
  const {
    compInstanceData: {
      className,
      currentSubroutine: { name, type, varCount } = {},
      scopes
    }
  } = props

  const tableData = [{
    key: 1,
    className,
    subroutineName: name,
    subroutineType: type,
    varCount
  }]

  return (
    <Wrapper>
      <TableWrapper>
        <Table
          columns={columns}
          dataSource={tableData}
          bordered
          pagination={{
            hideOnSinglePage: true
          }}
        />
      </TableWrapper>
      <Stack scopes={scopes} />
    </Wrapper>
  )
}

export default React.memo(ConceptNote)
