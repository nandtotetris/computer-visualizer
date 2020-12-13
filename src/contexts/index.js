import React, { useReducer } from 'react'
import { SET_JACK_CODE } from 'constants/context'

const MainContext = React.createContext()

const initialState = {
  jackCode: ''
}

export function reducer (state, action) {
  switch (action.type) {
    case SET_JACK_CODE:
      return {
        ...state,
        jackCode: action.jackCode
      }
    default: return { ...state }
  }
}

export default function MainContextProvider ({ children, providedState }) {
  const [state, dispatch] = useReducer(reducer, providedState || initialState)

  const setJackCode = jackCode => dispatch({ type: SET_JACK_CODE, jackCode })

  const actions = {
    setJackCode
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
