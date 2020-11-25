import { Tooltip } from 'antd'
import React from 'react'
import {
  Wrapper,
  Up,
  Down,
  MainWrapper,
  UpItem,
  VArrow,
  Text,
  LargeText,
  DownLeft,
  DownRight,
  DownCenter,
  DownLeftItem,
  HArrow,
  SmallText,
  DownRightItem,
  HRArrow
} from './styled'

const ALU = props => {
  const { a, b, controlBits, output } = props

  if (!controlBits) return null

  const [zx, nx, zy, ny, f, no] = controlBits

  return (
    <MainWrapper>
      <Wrapper>
        <Tooltip title='Selector'>
          <Up>
            <UpItem>
              <Text>{zx}</Text>
              <VArrow />
            </UpItem>
            <UpItem>
              <Text>{nx}</Text>
              <VArrow />
            </UpItem>
            <UpItem>
              <Text>{zy}</Text>
              <VArrow />
            </UpItem>
            <UpItem>
              <Text>{ny}</Text>
              <VArrow />
            </UpItem>
            <UpItem>
              <Text>{f}</Text>
              <VArrow />
            </UpItem>
            <UpItem>
              <Text>{no}</Text>
              <VArrow />
            </UpItem>
          </Up>
        </Tooltip>
        <Down>
          <DownLeft>
            <DownLeftItem>
              <Tooltip title='First input (x)'><SmallText>{a}</SmallText></Tooltip>
              <HArrow />
            </DownLeftItem>
            <DownLeftItem>
              <Tooltip title='Second input (y)'><SmallText>{b}</SmallText></Tooltip>
              <HArrow />
            </DownLeftItem>
          </DownLeft>
          <DownCenter><LargeText>ALU</LargeText></DownCenter>
          <DownRight>
            <DownRightItem>
              <HRArrow />
              <Tooltip title='Output'><SmallText>{output}</SmallText></Tooltip>
            </DownRightItem>
          </DownRight>
        </Down>
      </Wrapper>
    </MainWrapper>
  )
}

export default ALU
