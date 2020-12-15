import React from 'react'
import { ExampleWrapper, Pre, Text } from './styled'

const AExample = () => {
  return (
    <>
      <Text>A Instruction</Text>
      <Pre>
        <code>
          <b>@2</b> value is 2
        </code>
      </Pre>
      <Pre>
        <code>
          <b>@age</b> value is memory of age
        </code>
      </Pre>
    </>
  )
}

const CExample = () => {
  return (
    <>
      <Text>C Instruction</Text>
      <Pre>
        <code>
          <b>D=D+1</b> comp(D + 1) dest(D) jump(null)
        </code>
      </Pre>
      <Pre>
        <code>
          <b>MD=D;JMP</b> comp(D) dest(MD) jump(JMP)
        </code>
      </Pre>
    </>
  )
}

const Example = props => {
  const { isAInstruction } = props
  return (
    <ExampleWrapper>
      {isAInstruction ? <AExample /> : <CExample />}
    </ExampleWrapper>
  )
}

export default Example
