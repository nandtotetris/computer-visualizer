import React, { useEffect, useState } from 'react'
import { removeComments } from 'abstractions/software/compiler/tokenizer/utils'
import { Wrapper, Code, GlobalStyle, Pre, NextButton, MainWrapper } from './styled'
import { replaceTokenByIndex } from './util'
import { emitter } from 'emitter'

const ParserEditor = props => {
  const [highlitedCode, setHighlightedCode] = useState('')
  const { JACK_CODE, currentToken } = props
  const commentsRemovedJackCode = removeComments(JACK_CODE)

  useEffect(() => {
    if (!currentToken) return
    const index = currentToken.index()
    const value = currentToken.value()
    setHighlightedCode(
      replaceTokenByIndex(commentsRemovedJackCode, index, value)
    )
  // eslint-disable-next-line
  }, [currentToken])

  const handleNext = () => {
    emitter.emit('next')
  }

  return (
    <>
      <GlobalStyle />
      <MainWrapper>
        <NextButton onClick={handleNext}>Run</NextButton>
        <Wrapper>
          <Pre>
            <Code dangerouslySetInnerHTML={{ __html: highlitedCode || commentsRemovedJackCode }} />
          </Pre>
        </Wrapper>
      </MainWrapper>
    </>
  )
}

export default ParserEditor
