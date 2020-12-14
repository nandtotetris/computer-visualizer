import { Button } from 'antd'
import styled, { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  span.highlight-token {
    border: 1px solid black;
    padding: 5px;
    border-radius: 40%;
  }
`

export const Wrapper = styled.div`
  background: #f6f8fa;
  padding: 25px;
  height: 100%;
`

export const MainWrapper = styled.div`
  width:400px;
  height: 700px;
  margin-right: 25px;
  display: flex;
  flex-direction: column;
`

export const Pre = styled.pre`
  padding: 15px;
`

export const Code = styled.code`
  padding: 10px;
`

export const NextButton = styled(Button)`
  margin-bottom: 10px;
  align-self: flex-end;
`
