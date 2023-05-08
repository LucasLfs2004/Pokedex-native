import { NEW_POKEMON, INITIAL_POKEMON, MIDDLE_POKEMON, LAST_POKEMON } from "./actionTypes"


//Action Creator
export function changePokemon(pokemon) {
  return {
    type: NEW_POKEMON,
    payload: pokemon
  }
}
export function changeInitialPokemon(initialPokemon) {
  return {
    type: INITIAL_POKEMON,
    payload: initialPokemon
  }
}
export function changeMiddlePokemon(middlePokemon) {
  return {
    type: MIDDLE_POKEMON,
    payload: middlePokemon
  }
}
export function changeLastPokemon(lastPokemon) {
  return {
    type: LAST_POKEMON,
    payload: lastPokemon
  }
}