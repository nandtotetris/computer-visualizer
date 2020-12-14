import React, { useMemo } from 'react'
import { Table } from 'antd'
import { getColumnTitles, getTableEntries } from './util'
import { ItemWrapper } from 'components/Compiler/styled'
import { TableWrapper } from './styled'

const SymbolTableUI = props => {
  const { symbolTable: { classSymbolTable, subroutineSymbolTable } } = props

  const classSymbolTableData = useMemo(() => {
    return getTableEntries(classSymbolTable)
  }, [classSymbolTable])

  const subroutineSymbolTableData = useMemo(() => {
    return getTableEntries(subroutineSymbolTable)
  }, [subroutineSymbolTable])

  return (
    <ItemWrapper style={{ flexGrow: 1 }}>
      <TableWrapper>
        <Table
          columns={getColumnTitles('Subroutine Symbol Table')}
          dataSource={subroutineSymbolTableData}
          bordered
          pagination={{
            hideOnSinglePage: true
          }}
        />
      </TableWrapper>
      <TableWrapper>
        <Table
          columns={getColumnTitles('Class Symbol Table')}
          dataSource={classSymbolTableData}
          bordered
          pagination={{
            hideOnSinglePage: true
          }}
        />
      </TableWrapper>
    </ItemWrapper>
  )
}

export default React.memo(SymbolTableUI)
