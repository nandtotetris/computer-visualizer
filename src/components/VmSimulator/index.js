import React from 'react'
import { DivRefProvider } from
  'components/VmSimulator/contexts/divRefContext'
import { GeneralProvider } from
  'components/VmSimulator/contexts/generalContext'
import { ModeProvider } from
  'components/VmSimulator/contexts/modeContext'

import ExecutionSimulator from './vm-simulator'

const VmSimulatorApp = () => {
  return (
    <GeneralProvider>
      <ModeProvider>
        <DivRefProvider>
          <ExecutionSimulator />
        </DivRefProvider>
      </ModeProvider>
    </GeneralProvider>
  )
}

export default VmSimulatorApp
