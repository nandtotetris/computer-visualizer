import { TealButton } from 'components/Buttons'
import styled, { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  span.highlight-token {
    border: 1px solid black;
    padding: 5px;
    border-radius: 40%;
  }
`

export const MainWrapper = styled.div`
  margin-right: 25px;
  display: flex;
  flex-direction: column;
`

export const NextButton = styled(TealButton)`
  align-self: flex-end;
`
