import React from 'react'
import { Wrapper, Text } from './styled'

const Badge = props => {
  const { badgeText } = props
  return (
    <Wrapper>
      <Text>{badgeText}</Text>
    </Wrapper>
  )
}

export default Badge
