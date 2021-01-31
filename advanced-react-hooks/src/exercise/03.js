// useContext: simple Counter
// http://localhost:3000/isolated/exercise/03.js

import * as React from 'react'
import {ErrorBoundary} from 'react-error-boundary'

const CountContext = React.createContext()

const useCount = () => {
  const context = React.useContext(CountContext)
  if (!context) {
    throw new Error(`useCount must be used within a CountProvider.`)
  }
  return context
}

const CountProvider = ({children}) => {
  const [count, setCount] = React.useState(0)
  const value = [count, setCount]
  return <CountContext.Provider value={value}>{children}</CountContext.Provider>
}

function CountDisplay() {
  const [count] = useCount()
  return <div>{`The current count is ${count}`}</div>
}

function Counter() {
  const [, setCount] = useCount()
  const increment = () => setCount(c => c + 1)
  return <button onClick={increment}>Increment count</button>
}

function App() {
  return (
    <ErrorBoundary
      fallback={<div>useCount must be used within a CountProvider.</div>}
    >
      <div>
        <CountProvider>
          <CountDisplay />
          <Counter />
        </CountProvider>
      </div>
    </ErrorBoundary>
  )
}

export default App
