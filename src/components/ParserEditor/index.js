import React, { useEffect, useState } from 'react'
import { removeComments } from 'abstractions/software/compiler/tokenizer/utils'
import { GlobalStyle, NextButton, MainWrapper } from './styled'
import { replaceTokenByIndex } from './util'
import emitter from 'components/Emitter'
import CodeEditor from 'components/CodeEditor'

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
        <NextButton mb={10} onClick={handleNext}>Run</NextButton>
        <CodeEditor width={300} code={highlitedCode || commentsRemovedJackCode} />
      </MainWrapper>
    </>
  )
}

export default ParserEditor
