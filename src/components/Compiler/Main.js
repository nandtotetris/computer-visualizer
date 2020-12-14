import React, { useState } from 'react'
import { ItemWrapper, Wrapper, CodeWrapper, NextButton } from './styled'
import { Code, Pre, Wrapper as CWrapper } from 'components/ParserEditor/styled'
import { JACK_CODE } from './util'
import { removeComments } from 'abstractions/software/compiler/tokenizer/utils'
import TokenizerUI from 'components/Tokenizer'
import Compiler from '.'

const Main = props => {
  const [showRemovedComment, setShowRemovedComment] = useState(false)
  const [showTokenizer, setShowTokenizer] = useState(false)
  const [showParser, setShowParser] = useState(false)

  const removedComments = removeComments(JACK_CODE)

  if (showParser || props.compiler) return <Compiler />
  return (
    <Wrapper>
      <ItemWrapper>
        <CodeWrapper>
          <Pre>
            <Code>{JACK_CODE}</Code>
          </Pre>
        </CodeWrapper>
      </ItemWrapper>
      <NextButton
        type='primary'
        shape='circle'
        onClick={() => setShowRemovedComment(true)}
      >
        Next
      </NextButton>
      {
        showRemovedComment && (
          <>
            <ItemWrapper>
              <CWrapper>
                <Pre>
                  <Code>{removedComments}</Code>
                </Pre>
              </CWrapper>
            </ItemWrapper>
            <NextButton
              type='primary'
              shape='circle'
              onClick={() => setShowTokenizer(true)}
            >
              Next
            </NextButton>
          </>
        )
      }
      {
        showTokenizer &&
          <TokenizerUI
            JACK_CODE={JACK_CODE}
            next={() => setShowParser(true)}
          />
      }
    </Wrapper>
  )
}

export default Main
