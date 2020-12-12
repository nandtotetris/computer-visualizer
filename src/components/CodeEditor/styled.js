import { Badge } from 'antd'
import styled from 'styled-components'

export const MainWrapper = styled.div`
  width: 400px;
  height: 650px;
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const Wrapper = styled.div`
  background: #f6f8fa;
  padding: 25px;
  height: 100%;
  width: 100%;
`

export const Pre = styled.pre`
  padding: 15px;
`

export const Code = styled.code`
  padding: 10px;
`

export const MBBadge = styled(Badge)`
  margin-bottom: 20px;
`
