import styled from 'styled-components'

export const MainWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`

export const SnippetWrapper = styled.div`
  height: 250px;
  overflow: y-scroll;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: ${props => props.mb ? '30' : '0'}px;
  padding: 10px;
`

export const Pre = styled.pre`
  height: 100%;
`

export const Code = styled.code``
