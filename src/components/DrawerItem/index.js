import Header from 'components/Header'
import React from 'react'
import { Wrapper } from './styled'

const DrawerItem = props => {
  const { text, bg, color } = props
  return (
    <Wrapper bg={bg} co={color}>
      <Header>{text}</Header>
    </Wrapper>
  )
}

export default DrawerItem
