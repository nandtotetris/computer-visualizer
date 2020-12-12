import React from 'react'
import CompilerFirstStage from 'components/CompilerFirstStage'
import './App.css'

function App () {
  return (
    <div className='App'>
      <CompilerFirstStage code={`
      // This is a simple print program
      // Hello world

      class Main {
        do Output.printInt(4);
      }`}
      />
    </div>
  )
}

export default App
