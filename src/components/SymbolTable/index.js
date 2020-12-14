import React, { useMemo } from 'react'
import { Modal, Table } from 'antd'
import { getColumnTitles, getTableEntries } from './util'
import { TableWrapper, Wrapper } from './styled'
import { SYMBOL_TABLES_INFO } from 'components/ConceptNote/util'

const SymbolTableUI = props => {
  const { symbolTable: { classSymbolTable, subroutineSymbolTable } } = props

  const classSymbolTableData = useMemo(() => {
    return getTableEntries(classSymbolTable)
  }, [classSymbolTable])

  const subroutineSymbolTableData = useMemo(() => {
    return getTableEntries(subroutineSymbolTable)
  }, [subroutineSymbolTable])

  const onTableHeaderClick = header => {
    Modal.info({
      title: header,
      content: <div dangerouslySetInnerHTML={{ __html: SYMBOL_TABLES_INFO[header] }} />
    })
  }

  return (
    <Wrapper>
      <TableWrapper>
        <Table
          columns={getColumnTitles('Subroutine Symbol Table')}
          dataSource={subroutineSymbolTableData}
          bordered
          pagination={{
            hideOnSinglePage: true
          }}
          onHeaderRow={column => {
            return {
              onClick: () => onTableHeaderClick('subroutine') // click header row
            }
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
          onHeaderRow={column => {
            return {
              onClick: () => onTableHeaderClick('class') // click header row
            }
          }}
        />
      </TableWrapper>
    </Wrapper>
  )
}

export default React.memo(SymbolTableUI)
