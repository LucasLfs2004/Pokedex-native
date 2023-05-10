import { NEW_POKEMON, INITIAL_POKEMON, MIDDLE_POKEMON, LAST_POKEMON, FEMALE_POKEMON, MALE_POKEMON } from "../actions/actionTypes"

const initialState = {
  pokemon: "",
  initialPokemon: "",
  middlePokemon: "",
  lastPokemon: "",
  malePokemon: "",
  femalePokemon: "",
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
    case MALE_POKEMON: {
      return {
        ...state,
        malePokemon: action.payload
      }
    }
    case FEMALE_POKEMON:
      return {
        ...state,
        femalePokemon: action.payload
      }
    default:
      return state
  }
}