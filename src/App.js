import React from 'react'
import { Route, Switch } from 'react-router-dom'
import './App.css'
import CompilerFirstStage from 'components/CompilerFirstStage'
import { ROUTINGS } from 'constants/routing'
import CodeMirrorComponent from 'components/Codemirror'
import MainContextProvider from 'contexts'

function App () {
  return (
    <div className='App'>
      <MainContextProvider>
        <Switch>
          <Route exact path={ROUTINGS.MAIN} component={CodeMirrorComponent} />
          <Route path={ROUTINGS.COMPILER_FIRST_STAGE} component={CompilerFirstStage} />
        </Switch>
      </MainContextProvider>
    </div>
  )
}

export default App
