import React from 'react'
import Badge from 'components/Badge'
import { Pre, Wrapper, Code, MainWrapper } from './styled'
import { Tooltip } from 'antd'

const CodeEditor = props => {
  const { code, badgeText, tooltipText } = props
  return (
    <MainWrapper>
      <Badge badgeText={<Tooltip title={tooltipText}>{badgeText}</Tooltip>} />
      <Wrapper>
        <Pre>
          <Code>
            {code}
          </Code>
        </Pre>
      </Wrapper>
    </MainWrapper>
  )
}

export default CodeEditor
