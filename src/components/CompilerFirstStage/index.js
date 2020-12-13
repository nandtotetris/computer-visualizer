import React, { useEffect, useState } from 'react'
import { Modal } from 'antd'
import { TealButton } from 'components/Buttons'
import CodeEditor from 'components/CodeEditor'
import Tokenizer from 'components/Tokenizer'
import { MODAL_INFOS } from './util'
import { MainWrapper, ContentWrapper, GlobalStyle } from './styled'
import CommentRemover from 'components/CommentRemover'
import { useMainContextStates } from 'contexts'
import Header from 'components/Header'

const CompilerFirstStage = props => {
  const { jackCode } = useMainContextStates()
  const [index, setIndex] = useState(0)
  const [showCode, setShowCode] = useState(false)
  const [showRemoveComment, setShowRemoveComment] = useState(false)
  const [showTokenizer, setShowTokenizer] = useState(false)

  useEffect(() => {
    const { title, content } = MODAL_INFOS[index]
    Modal.info({
      title,
      content: (
        <div dangerouslySetInnerHTML={{ __html: content }} />
      ),
      onOk () {
        setShowCode(index >= 0)
        setShowRemoveComment(index >= 1)
        setShowTokenizer(index === 2)
      }
    })
  }, [index])

  const handleButtonClick = () => {
    if (index === 2) return console.log('Last one')
    setIndex(i => i + 1)
  }

  return (
    <MainWrapper>
      <GlobalStyle />
      <Header>Compiler Stage I (Preprocessor and Tokenizer)</Header>
      <TealButton mb={20} onClick={handleButtonClick} disabled={index === 3}>
        {index === 2 ? 'Finish' : 'Next'}
      </TealButton>
      <ContentWrapper>
        {showCode && <CodeEditor code={jackCode} badgeText='Jack program' />}
        {showRemoveComment && <CommentRemover code={jackCode} badgeText='Preprocessor' tooltipText='In this step comments are removed from jack code' />}
        {showTokenizer && <Tokenizer code={jackCode} badgeText='Tokenizer' tooltipText='In this step the jack code is broken into jack tokens' />}
      </ContentWrapper>
    </MainWrapper>
  )
}

export default CompilerFirstStage
