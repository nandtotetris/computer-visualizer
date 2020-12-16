import { Button } from 'antd'
import styled, { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  .ReactVirtualized__Table__headerRow {
    border-bottom: 1px solid #ccc;
  }
  .ReactVirtualized__Table__row {
    border-bottom: 1px solid #ccc;
  }
  .ReactVirtualized__Grid.ReactVirtualized__Table__Grid:focus {
    outline: none !important;
  }
  .ReactVirtualized__Table__headerRow div:nth-child(2) {
    text-align: center;
  }
`

export const Wrapper = styled.div`
  margin-right: 50px;
  width: 250px;
`

export const HeaderWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 15px;
`

export const HeaderWrapper2 = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
`

export const TableWrapper = styled.div`
  height: 720px;
  width: 250px;
  border: 1px solid #ccc;
  border-radius: 5px;
  overflow: hidden;
`

export const Left = styled.div``

export const Right = styled.div``

export const Header = styled.span`
  font-size: 18px;
`

export const ButtonMargin = styled(Button)`
  margin-right: 10px;
`
