import React from 'react'
import { Tooltip } from 'antd'
import Badge from 'components/Badge'
import { Pre, Wrapper, Code, MainWrapper } from './styled'

const CodeEditor = props => {
  const { code, badgeText, tooltipText, width } = props
  return (
    <MainWrapper width={width}>
      {badgeText && <Badge badgeText={<Tooltip title={tooltipText}>{badgeText}</Tooltip>} />}
      <Wrapper>
        <Pre>
          <Code dangerouslySetInnerHTML={{ __html: code }} />
        </Pre>
      </Wrapper>
    </MainWrapper>
  )
}

export default CodeEditor
