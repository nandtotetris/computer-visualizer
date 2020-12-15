import React from 'react'
import { Div } from './styled'
import { getHighlightCode } from './util'

const AInstruction = props => {
  const { instruction } = props
  const customInstruction = `${getHighlightCode('0', 'A')}${getHighlightCode(instruction.slice(1), 'value')}`

  return <Div dangerouslySetInnerHTML={{ __html: customInstruction }} />
}

export default AInstruction
