import styled from 'styled-components'

export const Wrapper = styled.div`
  width: 100%;
  height: 80px;
  background-color: ${props => props.bg ? props.bg : 'teal'};
  color: ${props => props.co ? props.co : 'white'};
  display: flex;
  align-items: center;
  padding-left: 20px;
  cursor: pointer;
`
