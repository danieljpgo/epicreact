// Basic Forms
// http://localhost:3000/isolated/exercise/06.js

import * as React from 'react'

function UsernameForm({ onSubmitUsername }) {
  const [username, setUsername] = React.useState('');

  function handleSubmit(event, value) {
    event.preventDefault();
    onSubmitUsername(value);
  }

  function handleChange(value) {
    setUsername(value.toLowerCase())
  }

  return (
    <form onSubmit={(event) => handleSubmit(event, username)}>
      <div>
        <label htmlFor="username">Username:</label>
        <input
          id="username"
          type="text"
          value={username}
          onChange={(event) => handleChange(event.target.value)}
        />
      </div>
      <button type="submit">
        Submit
      </button>
    </form>
  )
}

function App() {
  const onSubmitUsername = username => alert(`You entered: ${username}`)
  return <UsernameForm onSubmitUsername={onSubmitUsername} />
}

export default App
