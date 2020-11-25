import { Button, Input } from 'antd'
import styled, { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  .highlight-alu {
    background-color: teal;
    color: white;
    font-size: 16px;
    background-radius: 5px;
  }

  .alu-table .ant-table .ant-table-tbody > tr:hover > td {
    background: unset;
  }

  .highlight-bits {
    border: 1px solid #ccc;
    padding: 3px;
    font-size: 18px;
  }
`

export const Wrapper = styled.div`
  height: 245px;
  border: 1px solid #ccc;
  padding: 15px;
  margin-bottom: 20px;
`

export const ContentWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 25px;
`

export const Header = styled.span`
  font-size: 16px;
  font-weight: bold;
`

export const WMBInput = styled(Input)`
  margin-bottom: 15px;
  width: 250px;
`

export const InputsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 25px;
`

export const MButton = styled(Button)`
  margin-right: 25px;
  width: 65px;
`

export const OutputInput = styled(Input)`
  width: 300px;
`

export const InputWrapper = styled.div``

export const Span = styled.span`
  display: block;
`

export const OperationWrapper = styled.div`
  width: 65px;
  height: 32px;
  padding: 4px 15px;
  font-size: 14px;
  border-radius: 2px;
  color: rgba(0, 0, 0, 0.85);
  background: #fff;
  border: 1px solid #d9d9d9;
  margin-right: 25px;
  text-align: center;
  cursor: pointer;
`

export const InstructionWrapper = styled.span`
  font-size: 16px;
  margin-left: 10px;
`
