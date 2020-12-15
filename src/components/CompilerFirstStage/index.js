import React, { useEffect, useState } from 'react'
import { Modal } from 'antd'
import { Link } from 'react-router-dom'
import { TealButton } from 'components/Buttons'
import CodeEditor from 'components/CodeEditor'
import Tokenizer from 'components/Tokenizer'
import { MODAL_INFOS } from './util'
import { MainWrapper, ContentWrapper, GlobalStyle, ButtonsWrapper } from './styled'
import CommentRemover from 'components/CommentRemover'
import { useMainContextStates } from 'contexts'
import Header from 'components/Header'
import { ROUTINGS } from 'constants/routing'

const CompilerFirstStage = props => {
  const { jackCode } = useMainContextStates()
  const [index, setIndex] = useState(0)
  const [showRemoveComment, setShowRemoveComment] = useState(false)
  const [showTokenizer, setShowTokenizer] = useState(false)

  useEffect(() => {
    const { title, content } = MODAL_INFOS[index]
    if (index === 0) return
    Modal.info({
      title,
      content: (
        <div dangerouslySetInnerHTML={{ __html: content }} />
      ),
      onOk () {
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
      <ButtonsWrapper>
        <ConditionalLink condition={index === 2} to={ROUTINGS.COMPILER_SECOND_STAGE}>
          <TealButton mb={20} onClick={handleButtonClick} disabled={index === 3}>
            {index === 2 ? 'Finish' : 'Next'}
          </TealButton>
        </ConditionalLink>
      </ButtonsWrapper>
      <ContentWrapper>
        <CodeEditor code={jackCode} badgeText='Jack program' />
        {showRemoveComment && <CommentRemover code={jackCode} badgeText='Preprocessor' tooltipText='In this step comments are removed from jack code' />}
        {showTokenizer && <Tokenizer code={jackCode} badgeText='Tokenizer' tooltipText='In this step the jack code is broken into jack tokens' />}
      </ContentWrapper>
    </MainWrapper>
  )
}

const ConditionalLink = ({ children, to, condition }) => {
  return condition ? <Link to={to}>{children}</Link> : <>{children}</>
}

export default CompilerFirstStage
