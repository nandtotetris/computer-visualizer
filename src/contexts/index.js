import React, { useReducer } from 'react'
import { SET_JACK_CODE, SET_VM } from 'constants/context'

export const MainContext = React.createContext()

const initialState = {
  jackCode:
`// Simple program to print an integer

class Main {
  function void main () {
    do Output.printInt(1); // print 1
    return;
  }
}
  `,
  vm: '',
  tokenizerDelay: 500
}

export function reducer (state, action) {
  switch (action.type) {
    case SET_JACK_CODE:
      return {
        ...state,
        jackCode: action.jackCode
      }
    case SET_VM:
      return {
        ...state,
        vm: action.vm
      }
    default: return { ...state }
  }
}

export default function MainContextProvider ({ children, providedState }) {
  const [state, dispatch] = useReducer(reducer, providedState || initialState)

  const setJackCode = jackCode => dispatch({ type: SET_JACK_CODE, jackCode })

  const setVM = vm => dispatch({ type: SET_VM, vm })

  const actions = {
    setJackCode,
    setVM
  }

  return (
    <MainContext.Provider value={{ state, actions }}>
      {children}
    </MainContext.Provider>
  )
}

export function useMainContextStates () {
  return React.useContext(MainContext).state
}

export function useMainContextActions () {
  return React.useContext(MainContext).actions
}
