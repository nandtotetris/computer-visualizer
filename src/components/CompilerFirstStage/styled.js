import styled, { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  .modal-header {
    font-size: 16px;
    margin-bottom: 10px;
    display: block;
  }

  .ant-modal-content {
    width: 600px !important;

    & .ant-modal-confirm-title {
      display: none;
    }

    & span.anticon.anticon-info-circle > svg{
      display: none;
    }

    & .ant-btn.ant-btn-primary {
      background-color: teal;
    }
  }
`

export const MainWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  padding: 50px;
`

export const ContentWrapper = styled.div`
  display: grid;
  grid-gap: 140px;
  grid-template-columns: 400px 400px 400px;
  width: 100%;
  grid-auto-flow: dense;
`
