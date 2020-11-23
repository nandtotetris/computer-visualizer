import {
  convertToBinary,
  leftPadWithZeros
} from 'abstractions/software/assembler/code/utils'

export const convertTo16Bit = num => {
  return leftPadWithZeros(convertToBinary(num), 16)
}

export const add16Binary = (a, b) => {
  const result = leftPadWithZeros(
    (Number(parseInt(a, 2)) + Number(parseInt(b, 2))).toString(2), 16
  )

  if (result.length > 16) return result.slice(-16)
  return result
}

export const convertToNumber = bits => parseInt(bits, 2)

export const getComputeFromInstruction = instruction =>
  instruction.slice(4, 10)
