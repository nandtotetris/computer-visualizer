import React from 'react'
import { Wrapper, GlobalStyle, LeftSpan, RightSpan } from './styled'
import { highlightAtIndex } from './util'

const Decoder = props => {
  const { bits, index, msg } = props
  if (!bits) return null

  const modifiedBits = highlightAtIndex(bits, index)
  return (
    <>
      <GlobalStyle />
      <Wrapper>
        <LeftSpan dangerouslySetInnerHTML={{ __html: modifiedBits }} />
        <RightSpan>{msg}</RightSpan>
      </Wrapper>
    </>
  )
}

export default Decoder
