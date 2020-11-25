import styled, { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  .highlight-bit {
    border: 1px solid red;
    padding: 3px;
  }
`

export const Wrapper = styled.div`
  margin-bottom: 10px;
`

export const LeftSpan = styled.span`
  margin-right: 15px;
  font-size: 16px;
`

export const RightSpan = styled.span`
  font-size: 16px;
`
