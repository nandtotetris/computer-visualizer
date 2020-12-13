import { Button } from 'antd'
import styled from 'styled-components'

export const TealButton = styled(Button)`
  margin-bottom: ${props => props.mb ? `${props.mb}px` : '0px'};
  margin-top: ${props => props.mt ? `${props.mt}px` : '0px'};
  margin-right: ${props => props.mr ? `${props.mr}px` : '0px'};
  margin-left: ${props => props.ml ? `${props.ml}px` : '0px'};
  text-align: right;
  background-color: teal;
  outline: none;
  border-color: teal;
  color: white;

  &:hover, &:focus {
    background-color: #1aadad;
    color: #eee;
  }
`
