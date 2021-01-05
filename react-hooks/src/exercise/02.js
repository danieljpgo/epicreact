// useEffect: persistent state
// http://localhost:3000/isolated/exercise/02.js

import * as React from 'react'

const useLocalStorageState = (
  key,
  defaultValue = '',
  { serialize = JSON.stringify, deserialize = JSON.parse } = {},
) => {
  const [state, setState] = React.useState(() => {
    const defaultReturn = typeof defaultValue === 'function'
      ? defaultValue()
      : defaultValue;

    try {
      return deserialize(window.localStorage.getItem(key)) || defaultReturn;
    } catch {
      return defaultReturn
    }
  });

  const prevKeyRef = React.useRef(key);

  React.useEffect(() => {
    if (prevKeyRef.current !== key) {
      window.localStorage.removeItem(prevKeyRef.current)
    }

    prevKeyRef.current = key;
    try {
      window.localStorage.setItem(key, serialize(state))
    } catch {
      window.localStorage.setItem(key, defaultValue)
    }
  }, [key, defaultValue, state, serialize])

  return [state, setState];
}

function Greeting({ initialName = '' }) {
  const [name, setName] = useLocalStorageState('name', initialName);

  function handleChange(event) {
    setName(event.target.value)
  }

  return (
    <div>
      <form>
        <label htmlFor="name">Name: </label>
        <input
          value={name}
          onChange={handleChange}
          id="name"
        />
      </form>
      {name
        ? <strong>Hello {name}</strong>
        : 'Please type your name'}
    </div>
  );
}

function App() {
  return <Greeting />
}

export default App
