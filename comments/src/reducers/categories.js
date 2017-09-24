// REDUCER FOR OUR CACTEGORIES ACTIONS
import {
  GET_CATEGORIES,
  RECEIVE_CATEGORIES,
} from '../actions'

export default function categories(state = {}, action) {
  switch (action.type) {
    case GET_CATEGORIES:
      return state;
    case RECEIVE_CATEGORIES:
      const { categories } = action.categories
      return {
        ...state, 
        categories
      }
    default:
      return state;
  }
};

