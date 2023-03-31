import { createStore, combineReducers } from 'redux'

import pokemonReducer from './reducers/pokemon'

const reducers = combineReducers({
    pokemon: pokemonReducer,
})

function storeConfig() {
    return createStore(reducers)
}

export default storeConfig