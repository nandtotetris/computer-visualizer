import React, { Component } from 'react'
import ALU from 'abstractions/hardware/ALU'
import Memory from 'abstractions/hardware/Memory'
import ROM32K from 'abstractions/hardware/ROM32K'
import MemUI from './MemUI'
import { ARegister, DRegister, Pc } from './Register'
import {
  Wrapper, Right, Screen, RegistersWrapper, ControlUnit, FetchWrapper, DecodeWrapper, Span, BlockSpan
} from './styled'
import AluUI from './ALU'
import { convertTo16Bit, convertToNumber } from 'abstractions/hardware/ALU/util'
import { Button, Tooltip } from 'antd'
import Decoder from './Decoder'
import MachineInstruction from './machineInstruction'
import { SyncOutlined } from '@ant-design/icons'
import { ButtonMargin } from './MemUI/styled'

class CpuUI extends Component {
  constructor (props) {
    super(props)

    this.state = {
      aRegister: convertTo16Bit(0),
      dRegister: convertTo16Bit(0),
      aluOutput: convertTo16Bit(0),
      firstALUInput: convertTo16Bit(0),
      secondALUInput: convertTo16Bit(0),
      operation: '',
      cInstruction: null,
      pc: 0,
      memoryIndex: 0,
      currentInstruction: null,
      isRegModeBinary: true,
      disableExecuteAll: false
    }

    this.rom = new ROM32K()
    this.memory = new Memory()
    this.alu = new ALU()

    this.loadCode()
  }

  componentDidMount () {
    const { pc } = this.state
    const instruction = this.rom.value(pc)
    this.setState({
      currentInstruction: new MachineInstruction(instruction)
    })
  }

  loadCode = () => {
    const maxCode = [
      '0000000000000010',
      '1110110000011000',
      '0000000000000011',
      '1111000010010000',
      '0000000000000000',
      '1110001100001000'
    ]

    this.rom.load(maxCode)
  }

  setMemoryIndex = value => this.setState({ memoryIndex: value })

  setARegister = value => this.setState({ aRegister: value })

  setDRegister = value => this.setState({ dRegister: value })

  setPC = value => this.setState({ pc: value })

  runAfter = (f, seconds) => setTimeout(f, seconds)

  handleExecuteAll = () => {
    this.setState({ disableExecuteAll: true }, () => {
      const { pc } = this.state
      const instructionsLen = this.rom.length()

      const len = instructionsLen - pc

      for (let i = 1; i < len + 1; i++) {
        this.runAfter(() => this.handleExecute(), 1 * i)
      }
    })
  }

  handleExecute = () => {
    const { currentInstruction, dRegister, aRegister } = this.state
    const isCInstruction = currentInstruction.isCInstruction()

    // A Instruction
    if (!isCInstruction) {
      this.setARegister(currentInstruction.getInstruction())
      this.handlePCInc(true)
      return
    }

    const isMInput = currentInstruction.isMInput()
    const aRegisterNumber = convertToNumber(aRegister)
    if (isMInput) this.setMemoryIndex(aRegisterNumber)

    const ramAtARegister = this.memory.value(aRegisterNumber)
    const firstALUInput = dRegister
    const secondALUInput = isMInput ? ramAtARegister : aRegister
    const controlBits = currentInstruction.getControlBits()
    const destionations = currentInstruction.getDestinations()
    const operation = currentInstruction.getOperation()

    this.setState({ firstALUInput, secondALUInput, operation, cInstruction: currentInstruction }, () => {
      const { firstALUInput, secondALUInput } = this.state
      this.alu.setX(firstALUInput)
      this.alu.setY(secondALUInput)
      this.alu.setControlBits(controlBits)
      this.alu.execute()

      this.setState({
        aluOutput: this.alu.getOut()
      }, () => {
        this.saveALUOutputInDestinations(destionations)
        this.saveJump()
      })
    })
  }

  saveALUOutputInDestinations = destinations => {
    // If instruction has no dest code return
    if (!destinations.length) return

    const { aluOutput, aRegister } = this.state
    if (destinations.includes('A')) this.setState({ aRegister: aluOutput })
    if (destinations.includes('D')) this.setState({ dRegister: aluOutput })
    if (destinations.includes('M')) {
      const aRegisterNumber = convertToNumber(aRegister)
      this.memory.set(aRegisterNumber, aluOutput)
      this.setMemoryIndex(aRegisterNumber)
    }
  }

  saveJump = () => {
    const { currentInstruction } = this.state
    const jumpBits = currentInstruction.getJumpBits()

    const isNegative = this.alu.getNg()
    const isZero = this.alu.getZr()
    const isPostive = isZero === '0' && isNegative === '0'

    const jumpGreater = isPostive && jumpBits[2] === '1'
    const jumpEqual = (isZero === '1') && jumpBits[1] === '1'
    const jumpLessthan = (isNegative === ' 1') && jumpBits[0] === '1'

    const shouldJump = jumpGreater || jumpEqual || jumpLessthan

    this.handlePCInc(!shouldJump)
  }

  handlePCInc = shouldInc => {
    let { pc, aRegister } = this.state
    pc = shouldInc ? pc + 1 : convertToNumber(aRegister)

    this.setState({ pc }, () => {
      const instruction = this.rom.value(pc)
      this.setState({ currentInstruction: new MachineInstruction(instruction) })
    })
  }

  handleChangeMode = () => {
    this.setState({ isRegModeBinary: !this.state.isRegModeBinary })
  }

  render () {
    const {
      cInstruction,
      aRegister,
      dRegister,
      pc,
      currentInstruction,
      aRegisterColor,
      aluOutput,
      firstALUInput,
      secondALUInput,
      operation,
      memoryIndex,
      isRegModeBinary,
      disableExecuteAll
    } = this.state

    if (!currentInstruction) return null

    const isCInstruction = currentInstruction.isCInstruction()
    const isMInput = currentInstruction.isMInput()
    const instruction = currentInstruction.getInstruction()

    let aRegisterValue = aRegister
    let dRegisterValue = dRegister
    let pcValue = convertTo16Bit(pc)
    let firstALUInputValue = firstALUInput
    let secondALUInputValue = secondALUInput
    let aluOutputValue = aluOutput

    if (!isRegModeBinary) {
      aRegisterValue = convertToNumber(aRegister)
      dRegisterValue = convertToNumber(dRegister)
      pcValue = pc
      firstALUInputValue = convertToNumber(firstALUInput)
      secondALUInputValue = convertToNumber(secondALUInput)
      aluOutputValue = convertToNumber(aluOutput)
    }

    return (
      <Wrapper>
        <MemUI pc={pc} mem={this.rom} type='ROM' />
        <MemUI memoryIndex={memoryIndex} mem={this.memory} type='Memory' />

        <Right>
          <Screen><h1>Screen</h1></Screen>
          <RegistersWrapper>
            <Pc value={pcValue} />
            <ARegister color={aRegisterColor} value={aRegisterValue} />
            <DRegister value={dRegisterValue} />
          </RegistersWrapper>
          <ControlUnit>
            <FetchWrapper>
              <BlockSpan>Fetch</BlockSpan>
              <Span>{instruction}</Span>
            </FetchWrapper>
            <DecodeWrapper>
              <BlockSpan>Decode</BlockSpan>
              <Decoder
                index={0}
                bits={instruction}
                msg={`${isCInstruction ? 'C' : 'A'} Instruction`}
              />
              {
                isCInstruction && (
                  <Decoder
                    index={3}
                    bits={instruction}
                    msg={`${isMInput ? 'M' : 'A'} Input`}
                  />
                )
              }
            </DecodeWrapper>
          </ControlUnit>
          <AluUI
            a={firstALUInputValue}
            b={secondALUInputValue}
            isCInstruction={isCInstruction}
            aluOutput={aluOutputValue}
            operation={operation}
            isRegModeBinary={isRegModeBinary}
            cInstruction={cInstruction}
          />
          <Tooltip title='Change mode'>
            <ButtonMargin
              type='primary'
              onClick={this.handleChangeMode}
              shape='circle'
              icon={<SyncOutlined />}
            />
          </Tooltip>
          <ButtonMargin
            type='primary'
            onClick={this.handleExecute}
          >
            Execute
          </ButtonMargin>
          <Button
            type='primary'
            onClick={this.handleExecuteAll}
            disabled={disableExecuteAll}
          >
            Execute All
          </Button>
        </Right>
      </Wrapper>
    )
  }
}

export default CpuUI
