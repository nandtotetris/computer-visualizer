import React from 'react'
import { ContentWrapper, Div } from './styled'
import { getHighlightCode } from './util'

const CInstruction = props => {
  const { instruction } = props
  const compute = instruction.slice(3, 10)
  const dest = instruction.slice(10, 13)
  const jump = instruction.slice(13)
  const customInstruction = `${getHighlightCode('111', 'C')}${getHighlightCode(compute, 'comp')}${getHighlightCode(dest, 'dest')}${getHighlightCode(jump, 'jump')}`

  return (
    <ContentWrapper>
      <Div dangerouslySetInnerHTML={{ __html: customInstruction }} />
    </ContentWrapper>
  )
}

export default CInstruction
