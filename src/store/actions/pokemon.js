import { NEW_POKEMON } from "./actionTypes"

//Action Creator
export function changePokemon(pokemon) {
  return {
    type: NEW_POKEMON,
    payload: pokemon
  }
}