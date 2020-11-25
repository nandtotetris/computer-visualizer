import { Input } from 'antd'
import styled from 'styled-components'

export const WInput = styled(Input)`
  width: 210px;
  color: blue;

  .ant-input {
    color: ${props => props.color};
  }
`
