import { COMMAND_TYPE } from 'abstractions/software/assembler/parser/types'
import React, { useReducer, useEffect } from 'react'
import {
  getReducer, getSetters
} from '../hooks/util'
import {
  SimpleAdd,
  StackTest,
  BasicTest,
  PointerTest,
  StaticTest,
  BasicLoop,
  FibonacciSeries,
  SimpleFunction
} from '../files'
import HVMTranslator from 'abstractions/software/vm-translator'
import Assembler from 'abstractions/software/assembler'

const files = [
  SimpleAdd, StackTest, BasicTest, PointerTest, StaticTest, BasicLoop,
  FibonacciSeries, SimpleFunction
]

const ACTIONS = {
  VM_COMMANDS: 'vmCommands',
  SET_MAX_VM_PARSE_COUNT: 'maxVmParseCount',
  SET_CURRENT_VM_COMMAND: 'currentVmCommand',
  SET_IS_NEXT_VM_CMD_PROVIDED: 'isNextVmCmdProvided',
  SET_SHOULD_PROVIDE_NEXT_VM_CMD: 'shouldProvideNextVmCmd',
  SET_VM_FILE_INDEX: 'vmFileIndex',
  SET_CURRENT_VM_INDEX: 'currentVmCmdIndex',
  SET_RESET: 'reset',
  SET_TRANSLATOR: 'translator',
  SET_MAIN_ASSEMBLY: 'mainAssembly',
  SET_IS_ABOUT_TO_EXEC_ASM: 'isAboutToExecAsm',
  SET_SHOULD_EXEC_ASM: 'shouldExecAsm',
  IS_CURRENT_ASM_BATCH_EXHAUSTED: 'isCurrentAsmBatchExhausted',
  SET_IS_SKIPPING: 'isSkipping',
  SET_JUMP_ADDRESS: 'jumpAddress',
  SET_ASSEMBLER: 'assembler',
  SET_MAX_ASM_PARSE_COUNT: 'maxAsmParseCount',
  SET_BATCH_ASSEMBLER: 'batchAssembler',
  SET_ASM_BATCH_INDEX: 'asmBatchIndex',
  SET_ASM_BATCH_COUNT: 'asmBatchCount',
  SET_CURRENT_ASM_INDEX: 'lastRunRomAddress',
  SET_ASSEMBLER_STEP_COUNT: 'assemblerParseCount',
  SET_ASSEMBLER_LINE_COUNT: 'assemblerLineCount',
  SET_FUNCTION_INFO: 'functionInfo',
  SET_CURRENT_FUNCTION: 'currentFunction'
}

const generalReducer = getReducer(ACTIONS)

const initialState = {
  vmCommands: [],
  currentVmCommand: null,
  shouldProvideNextVmCmd: false,
  isNextVmCmdProvided: false,
  reset: false,
  vmFileIndex: 0,
  currentVmCmdIndex: -1,
  translator: null,
  mainAssembly: [],
  isCurrentAsmBatchExhausted: true,
  isSkipping: false,
  jumpAddress: null,
  assembler: null,
  batchAssembler: null,
  asmBatchIndex: -1,
  asmBatchCount: 0,
  lastRunRomAddress: 0,
  assemblerParseCount: 0,
  assemblerLineCount: 0,
  maxAsmParseCount: 0,
  maxVmParseCount: 0,
  functionInfo: {},
  currentFunction: '',
  isAboutToExecAsm: false,
  shouldExecAsm: false
}

const GeneralContext = React.createContext(initialState)

const GeneralProvider = (props) => {
  const [state, dispatch] = useReducer(generalReducer, initialState)

  useEffect(() => {
    resetVmFile()
  // eslint-disable-next-line
  }, [state.vmFileIndex, state.reset])

  const setters = getSetters(dispatch, ACTIONS)
  const setAssemblerParseCount = count => {
    setters.assemblerParseCount(count)
    if (count > state.maxAsmParseCount) {
      setters.maxAsmParseCount(count)
    }
  }
  const setCurrentVmIndex = index => {
    setters.currentVmCmdIndex(index)
    if (index + 1 > state.maxVmParseCount) {
      setters.maxVmParseCount(index + 1)
    }
  }

  const resetVmFile = (file) => {
    const translator = new HVMTranslator([{
      className: 'VmClass',
      file: file || files[state.vmFileIndex]
    }])
    const sameTranslator = new HVMTranslator([{
      className: 'VmClass',
      file: file || files[state.vmFileIndex]
    }])
    const mainAssembly = sameTranslator.translate()
    const mainAssembler = new Assembler(sameTranslator.translate())
    setters.mainAssembly(mainAssembly.trim().split('\n'))
    mainAssembler.beforeStep()
    setters.assembler(mainAssembler)
    setters.lastRunRomAddress(0)
    setters.assemblerLineCount(0)
    setters.assemblerParseCount(0)
    setters.translator(translator)
    setters.currentVmCmdIndex(-1)
    setters.asmBatchIndex(-1)
    setters.asmBatchCount(0)
    setters.maxAsmParseCount(0)
    setters.maxVmParseCount(0)
  }

  /**
   * IMPORTANT NOTE: lastRunRomAddress exlcudes label commands,
   * And the assembler has parsed upto a point it means that the asm
   * code has been exectued up to that same point
   */
  const stepAssembler = () => {
    const { assemblerParseCount, assembler, lastRunRomAddress } = state
    setAssemblerParseCount(assemblerParseCount + 1)
    const parser = assembler.step()
    const isLCommand = parser.commandType() === COMMAND_TYPE.L_COMMAND
    setters.lastRunRomAddress(isLCommand
      ? lastRunRomAddress : lastRunRomAddress + 1)
    return parser
  }

  const stepTranslator = isSimulationModeOff => {
    const {
      translator, assembler, currentVmCmdIndex, maxVmParseCount
    } = state
    const batch = translator.step()
    const vmLooping = currentVmCmdIndex + 1 < maxVmParseCount
    if (vmLooping && isSimulationModeOff) {
      for (let i = 0; i < batch.length; i++) {
        assembler.step()
      }
      setters.assemblerParseCount(state.assemblerParseCount + batch.length)
      setters.lastRunRomAddress(state.lastRunRomAddress +
        getNonLabelCommandCount(batch.join('\n')))
    }
    return batch
  }

  // rewind both the translator and the assembler
  // assembler should be rewinded here only if
  // simulationIsOff, otherwise it would have rewinded itself
  const rewindTranslator = (vmIndex, isSimulationOff) => {
    const translator = new HVMTranslator([{
      className: 'VmClass',
      file: files[state.vmFileIndex]
    }])
    const batches = []
    let batch = null
    for (let i = 0; i < vmIndex + 1; i++) {
      batch = translator.step()
      batches.push([...batch])
    }
    setters.translator(translator)
    if (!isSimulationOff) return
    const assembler = new Assembler(state.mainAssembly.join('\n'))
    assembler.beforeStep()
    let lastRunAddress = 0
    let parseCount = 0
    for (let i = 0; i < batches.length; i++) {
      parseCount += batches[i].length
      for (let j = 0; j < batches[i].length; j++) {
        assembler.step()
      }
      lastRunAddress += getNonLabelCommandCount(batches[i].join('\n'))
    }
    setters.assembler(assembler)
    setters.assemblerParseCount(parseCount)
    setters.lastRunRomAddress(lastRunAddress)
  }

  // the assembler rewinds itself
  const rewindAssembler = lastRunAddress => {
    const assembler = new Assembler(state.mainAssembly.join('\n'))
    assembler.beforeStep()
    let rewindOver = false
    let runAddress = 0
    let parseCount = 0
    while (!rewindOver) {
      const parser = assembler.step()
      const isLCommand = parser.commandType() === COMMAND_TYPE.L_COMMAND
      runAddress = isLCommand ? runAddress : runAddress + 1
      rewindOver = runAddress === lastRunAddress
      parseCount += 1
    }
    setters.assembler(assembler)
    setters.lastRunRomAddress(lastRunAddress)
    setAssemblerParseCount(parseCount)
  }

  const getNonLabelCommandCount = assembly => {
    const assembler = new Assembler(assembly)
    const parser = assembler.beforeStep()
    let nonLabelCount = 0
    while (parser.hasMoreCommands()) {
      assembler.step()
      const isLCommand = parser.commandType() === COMMAND_TYPE.L_COMMAND
      nonLabelCount = isLCommand ? nonLabelCount : nonLabelCount + 1
    }
    return nonLabelCount
  }

  const setLinecount = lineCount => {
    setters.assemblerLineCount(lineCount)
    // synchronizeAssembler(lineCount)
  }

  const updateMaxPtrIndex = (seg, index) => {
    const { currentFunction, functionInfo } = state
    if (!currentFunction) return
    const funcInfo = functionInfo || {}
    if (!funcInfo[currentFunction]) funcInfo[currentFunction] = {}
    const attr = seg === 'that' ? 'maxThatIndex' : 'maxThisIndex'
    const currentSegIndex = funcInfo[currentFunction][attr] || 0
    if (currentSegIndex >= index) return
    setters.functionInfo({
      ...functionInfo,
      [currentFunction]: {
        ...functionInfo[currentFunction],
        [attr]: index
      }
    })
  }

  const getMaxPtrIndex = (funcName, seg) => {
    const { functionInfo } = state
    if (!functionInfo || !functionInfo[funcName]) return
    const attr = seg === 'that' ? 'maxThatIndex' : 'maxThisIndex'
    return functionInfo[funcName][attr]
  }

  return (
    <GeneralContext.Provider
      value={{
        state,
        setters: {
          ...setters,
          currentVmCmdIndex: setCurrentVmIndex,
          assemblerParseCount: setAssemblerParseCount,
          assemblerLineCount: setLinecount
        },
        stepTranslator,
        stepAssembler,
        resetVmFile,
        rewindAssembler,
        rewindTranslator,
        getMaxPtrIndex,
        updateMaxPtrIndex
      }}
    >
      {props.children}
    </GeneralContext.Provider>
  )
}

export { GeneralContext, GeneralProvider }
