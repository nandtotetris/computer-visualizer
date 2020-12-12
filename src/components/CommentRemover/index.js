import { removeComments } from 'abstractions/software/compiler/tokenizer/utils'
import CodeEditor from 'components/CodeEditor'
import React from 'react'

const CommentRemover = props => {
  const { code, ...rest } = props
  const commentRemovedCode = removeComments(code)
  return <CodeEditor code={commentRemovedCode} {...rest} />
}

export default CommentRemover
