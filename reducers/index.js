import {
  RECEIVE_DECKS,
  CREATE_DECK,
  DELETE_DECK,
  CREATE_CARD
} from '../actions';

function decks (state = {}, action) {
  switch (action.type) {
    case RECEIVE_DECKS :
      return {
        ...action.decks,
      }
    case CREATE_DECK :
      return {
        ...state,
        ...action.deck
      }
    case DELETE_DECK : {
      const { [action.title]: value, ...newState } = state;
      return newState
    }
    case CREATE_CARD :
      return {
        ...state,
        [action.title]: {
          ...state[action.title],
          questions: [...state[action.title].questions, action.card]
        } 
      }
    default :
      return state
  }
}

export default decks