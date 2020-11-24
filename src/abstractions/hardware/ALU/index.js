import { And16 } from '../AND'
import { Not16 } from '../Not'
import { add16Binary, convertTo16Bit, convertToNumber } from './util'

class ALU {
  constructor (x, y, controlBits) {
    // INPUT PINS
    this.x = x || convertTo16Bit(0) // D register
    this.y = y || convertTo16Bit(0) // A register or M(value at A address)
    this.zx = '0' // Zero the x input
    this.nx = '0' // Negate the x input
    this.zy = '0' // Zero the y input
    this.ny = '0' // Negate the y input
    this.f = '0' // Function code: 1 for Add, 0 for And
    this.no = '0' // Negate the output

    // OUTPUT PINS
    this.out = convertTo16Bit(0)
    this.zr = '0'
    this.ng = '0'
  }

  setX (x) {
    this.x = x
  }

  setY (y) {
    this.y = y
  }

  setOut (out) {
    this.out = out
  }

  getOut () {
    return this.out
  }

  setZr (zr) {
    this.zr = zr
  }

  getZr () {
    return this.zr
  }

  setNg (ng) {
    this.ng = ng
  }

  getNg () {
    return this.ng
  }

  setControlBits (controlBits) {
    [this.zx, this.nx, this.zy, this.ny, this.f, this.no] = controlBits
  }

  isOn (bit) {
    return bit === '1'
  }

  isOff (bit) {
    return bit === '0'
  }

  execute () {
    if (this.isOn(this.zx)) this.setX(convertTo16Bit(0))
    if (this.isOn(this.nx)) this.setX(Not16(this.x))
    if (this.isOn(this.zy)) this.setY(convertTo16Bit(0))
    if (this.isOn(this.ny)) this.setY(Not16(this.y))

    if (this.isOn(this.f)) this.setOut(add16Binary(this.x, this.y))
    else this.setOut(And16(this.x, this.y))

    if (this.isOn(this.no)) this.setOut(Not16(this.out))

    if (convertToNumber(this.out) === 0) this.setZr('1')
    else this.setZr('0')

    // check the 15th bit
    this.setNg(this.out[0])
  }
}

export default ALU
