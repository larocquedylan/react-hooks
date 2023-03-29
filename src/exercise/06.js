// useEffect: HTTP requests
// http://localhost:3000/isolated/exercise/06.js

import * as React from 'react'
// 🐨 you'll want the following additional things from '../pokemon':
// fetchPokemon: the function we call to get the pokemon info
// PokemonInfoFallback: the thing we show while we're loading the pokemon info
// PokemonDataView: the stuff we use to display the pokemon info
import {
  PokemonForm,
  fetchPokemon,
  PokemonDataView,
  PokemonInfoFallback,
} from '../pokemon'

function PokemonInfo({pokemonName}) {
  // const [pokemon, setPokemon] = React.useState(null)
  // const [error, setError] = React.useState(null)
  // // set status state
  // const [status, setStatus] = React.useState('idle')

  // put state in an object
  const [state, setState] = React.useState({
    pokemon: null,
    error: null,
    status: 'idle',
  })
  const {pokemon, error, status} = state

  // React.useEffect(() => {
  //   if (!pokemonName) {
  //     return
  //   }
  //   // setStatus('pending')
  //   // setPokemon(pokemon => null)
  //   fetchPokemon(pokemonName)
  //     .then(res => {
  //       // setPokemon(res)
  //       // console.log(res)
  //       // setStatus('resolved')
  //     })
  //     .catch(err => {
  //       // console.log(err)
  //       // setError(err)
  //       // setStatus('rejected')
  //     })
  // }, [pokemonName])

  React.useEffect(() => {
    if (!pokemonName) {
      return
    }
    // Update the state object with the new pokemon value
    setState(prevState => ({...prevState, pokemon: null, status: 'pending'}))
    fetchPokemon(pokemonName)
      .then(res => {
        setState({pokemon: res, status: 'resolved'})
      })
      .catch(err => {
        setState({error: err, status: 'rejected'})
      })
  }, [pokemonName])

  // render ui based on status
  if (status === 'idle') {
    return 'Submit a pokemon'
  } else if (status === 'pending') {
    return <PokemonInfoFallback name={pokemonName} />
  } else if (status === 'rejected') {
    return (
      <div role="alert">
        There was an error:{' '}
        <pre style={{whiteSpace: 'normal'}}>{error.message}</pre>
      </div>
    )
  } else if (status === 'resolved') {
    return <PokemonDataView pokemon={pokemon} />
  }
}

function App() {
  const [pokemonName, setPokemonName] = React.useState('')

  function handleSubmit(newPokemonName) {
    setPokemonName(newPokemonName)
  }

  return (
    <div className="pokemon-info-app">
      <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />
      <hr />
      <div className="pokemon-info">
        <PokemonInfo pokemonName={pokemonName} />
      </div>
    </div>
  )
}

export default App
