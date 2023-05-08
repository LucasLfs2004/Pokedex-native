import { NEW_POKEMON, INITIAL_POKEMON, MIDDLE_POKEMON, LAST_POKEMON } from "../actions/actionTypes"

const initialState = {
  pokemon: "",
  initialPokemon: "",
  middlePokemon: "",
  lastPokemon: "",
}

export default function (state = initialState, action) {
  switch (action.type) {
    case NEW_POKEMON:
      return {
        ...state,
        pokemon: action.payload
      }
    case INITIAL_POKEMON:
      return {
        ...state,
        initialPokemon: action.payload
      }
    case MIDDLE_POKEMON:
      return {
        ...state,
        middlePokemon: action.payload
      }
    case LAST_POKEMON:
      return {
        ...state,
        lastPokemon: action.payload
      }
    default:
      return state
  }
}