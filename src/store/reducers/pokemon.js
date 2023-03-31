import { NEW_POKEMON } from "../actions/actionTypes"

const initialState = {
  pokemon: ""
}

export default function(state = initialState, action) {
  switch(action.type) {
      case NEW_POKEMON:
          return {
              ...state,
              pokemon: action.payload
          }
      default:
          return state
  }
}