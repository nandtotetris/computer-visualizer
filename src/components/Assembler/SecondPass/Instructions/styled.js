import { TealButton } from 'components/Buttons'
import styled, { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  .highlight-instr {
    border: 1px solid #ccc;
    font-size: 25px;
    padding: 5px;
  }

  .highlight-instr-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .highlight-text {
    font-size: 20px;
    text-transform: uppercase;
  }

  .highlight-instr-row {
    background-color: teal;
    color: white;
    font-size: 16px;
    background-radius: 5px;
  }

  .instruction .ant-table .ant-table-tbody > tr:hover > td {
    background: unset;
  }
`

export const Div = styled.div`
  font-size: 16px;
  display: flex;
`

export const Wrapper = styled.div`
  margin-left: 25px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 300px;
`

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
`

export const Button = styled(TealButton)`
  text-align: center;
  font-size: 18px;
  margin-top: 20px;
  height: 40px;
`

export const Text = styled.span`
  font-size: 18px;
`

export const ExampleWrapper = styled.div`
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  border: 1px solid #ccc;
  padding: 10px;
`

export const Pre = styled.pre`
  margin-bottom: 0px;
`

export const ModalTableWrapper = styled.div`
  display: flex;
`

export const CompModalTable = styled.div`
  width: 250px;
  margin-right: 10px;
`
