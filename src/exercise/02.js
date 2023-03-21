// useEffect: persistent state
// http://localhost:3000/isolated/exercise/02.js

import * as React from 'react'

function useLocalStorageState() {
  if (name) {
    window.localStorage.setItem('name', name)
  } else {
    window.localStorage.getItem('name')
  }
}

function Greeting({initialName = ''}) {
  // 🐨 initialize the state to the value from localStorage
  // let initial = window.localStorage.getItem('name') || initialName
  // const [name, setName] = React.useState(initial)
  const [name, setName] = React.useState(useLocalStorageState || initialName)

  // 🐨 Here's where you'll use `React.useEffect`.
  React.useEffect(() => {
    useLocalStorageState()
  }, [name])

  function handleChange(event) {
    setName(event.target.value)
  }
  return (
    <div>
      <form>
        <label htmlFor="name">Name: </label>
        <input value={name} onChange={handleChange} id="name" />
      </form>
      {name ? <strong>Hello {name}</strong> : 'Please type your name'}
    </div>
  )
}

function App() {
  return <Greeting />
}

export default App
