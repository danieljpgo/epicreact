// useEffect: HTTP requests
// http://localhost:3000/isolated/exercise/06.js

import * as React from 'react'
import {PokemonForm, fetchPokemon, PokemonInfoFallback, PokemonDataView} from '../pokemon'
import {ErrorBoundary} from 'react-error-boundary';


function PokemonInfo({pokemonName}) {
  const [state, setState] = React.useState({ status: 'idle', pokemon: null, error: null});
  const {status, error, pokemon} = state;

  React.useEffect(() => {
    if (Boolean(pokemonName)) {
      setState((prev) => ({...prev, status: 'pending', error: null}));
      fetchPokemon(pokemonName)
        .then((pokemonData) => {
          setState((prev) => ({...prev, status: 'resolved', pokemon: pokemonData}));
        })
        .catch((error) => {
          setState((prev) => ({...prev, status: 'rejected', pokemon: null, error}));
        });
    }
  }, [pokemonName])

  if (status === 'rejected') {
    throw new Error(error.message);
    // return (
    //   <div role="alert">
    //     There was an error: <pre style={{whiteSpace: 'normal'}}>{error.message}</pre>
    //   </div>
    // );
  }
  if (status === 'idle') {
    return "Submit a pokemon";
  }
  if (status === 'pending') {
    return <PokemonInfoFallback name={pokemonName} />; 
  }
  return <PokemonDataView pokemon={pokemon}/>;
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
        <ErrorBoundary 
          resetKeys={[pokemonName]} 
          onReset={() => setPokemonName('')}
          FallbackComponent={({resetErrorBoundary}) =>
            <button onClick={() => resetErrorBoundary()}>
              try again
             </button>
          }>
          <PokemonInfo pokemonName={pokemonName} />
        </ErrorBoundary>
      </div>
    </div>
  )
}

export default App
