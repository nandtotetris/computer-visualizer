import React from 'react'
import { Code, MainWrapper, Pre, SnippetWrapper } from './styled'

const CodeSnippet = props => {
  const { upCode, downCode } = props
  return (
    <MainWrapper>
      <SnippetWrapper mb>
        <Pre>
          <Code dangerouslySetInnerHTML={{ __html: upCode }} />
        </Pre>
      </SnippetWrapper>
      <SnippetWrapper>
        <Pre>
          <Code dangerouslySetInnerHTML={{ __html: downCode }} />
        </Pre>
      </SnippetWrapper>
    </MainWrapper>
  )
}

export default CodeSnippet
