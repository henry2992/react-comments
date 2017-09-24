// REDUCER FOR OUR Comments ACTIONS
import {
  RECEIVE_COMMENTS,
  DELETE_COMMENT,
  RECEIVE_SINGLE_COMMENT,
  SORTED_COMMENTS,
} from '../actions'


const initialState = {
  sortBy: 'voteScore',
  order: 'asc',
}

export default function comments (state = {}, action) {
  switch (action.type) {
    case RECEIVE_COMMENTS:
      const post_comments   = action.posts_comments
      return {
        ...state, 
        post_comments
      }
    case DELETE_COMMENT:
      return state;
    case RECEIVE_SINGLE_COMMENT:
       const { comment } = action;
      return { 
        ... state,
        comment
      }
    case SORTED_COMMENTS: {
      const { sortBy, order } = action
      return { ...state, sortBy, order }
    }
    default:
      return state;
  }
};
