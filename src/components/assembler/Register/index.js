import { convertToNumber } from 'abstractions/hardware/ALU/util'
import { Tooltip } from 'antd'
import React from 'react'
import { WInput } from './styled'

const Register = props => {
  const { type, value, pholder, color } = props
  return (
    <Tooltip title={convertToNumber(value)}>
      <WInput color={color} placeholder={pholder} addonBefore={type} value={value} />
    </Tooltip>
  )
}

export const ARegister = ({ value, color }) => <Register type='A' pholder='A Register' value={value} color={color} />
export const DRegister = ({ value }) => <Register type='D' pholder='D Register' value={value} />
export const Pc = ({ value }) => <Register type='PC' pholder='Program Counter' value={value} />
