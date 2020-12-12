import React from 'react'
import CodeMirror from 'components/Codemirror'
// import CompilerFirstStage from 'components/CompilerFirstStage'
import './App.css'

function App () {
  return (
    <div className='App'>
      {/* <CompilerFirstStage code={`
      // This is a simple print program
      // Hello world

      class Main {
        do Output.printInt(4);
      }`}
      /> */}
      <CodeMirror />
    </div>
  )
}

export default App
