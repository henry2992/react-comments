import {
  GET_ALL_POSTS,
  RECEIVE_POSTS,
  GET_SINGLE_POST,
  RECEIVE_SINGLE_POST,
  RECEIVE_CATEGORIES_POST,
  SORTED_POSTS,
  DELETE_POST,
} from '../actions'

const initialState = {
  sortBy: 'voteScore',
  order: 'asc',
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_POSTS:
      return state
    case RECEIVE_POSTS:
      const { posts } = action
      // "copy the contents of the object to this object"
      // const state = { foo: 'bar'};
      // const newState = { ...state };

      // In this case

      // const posts = ['post1'];
      // const state = { foo: 'bar' };
      // const newState = { ...state, posts };

      // newState would be : { foo: 'bar', posts: ['post1'] }
      return {
        ...state, 
        posts
      }
    case GET_SINGLE_POST:
      return state
    case RECEIVE_SINGLE_POST:
      const { post } = action;
      return { 
        ... state,
        post
      }
    case RECEIVE_CATEGORIES_POST:
      const { category_posts } = action;
      return { 
        ... state,
        category_posts
      }
    case SORTED_POSTS: {
      const { sortBy, order } = action
      return { ...state, sortBy, order }
    }
    case DELETE_POST:
      return state;
    default:
      return state;
  }
}




