import styled, { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  .high-light-row {
    background-color: teal;
    color: white;
    font-size: 16px;
    background-radius: 5px;
  }
  .grammar-table .ant-table .ant-table-tbody > tr:hover > td {
    background: unset;
  }

  span.description {
    font-size: 17px;
  }

  .code-sample {
    border: 1px solid #ccc;
    margin-top: 10px;
    padding: 10px;
  }

  .ant-modal-content {
    width: 800px !important;

    & .ant-btn.ant-btn-primary {
      background-color: teal;
    }
  }
`

export const Wrapper = styled.div`
  border: 1px solid #ccc;
  border-top: 0px;
  padding-top: 25px;
`

export const Item = styled.div`
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-top: 1px solid #ccc;
  font-size: 16px;
  cursor: pointer;
`

export const MainWrapper = styled.div`
  margin-top: 50px;
`

export const ButtonWrapper = styled.div`
  text-align: end;
  margin-bottom: 15px;
`

export const TextWrapper = styled.div`
  text-align: center;
  margin-bottom: 20px;
`

export const Header = styled.span`
  font-size: 18px
`

export const Code = styled.code`
  border: 1px solid #ccc;
  padding: 5px;
`
