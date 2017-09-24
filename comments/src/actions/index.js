import * as API from './../utils/Api'
export const GET_CATEGORIES = 'GET_CATEGORIES'
export const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES'
export const GET_ALL_POSTS = 'GET_ALL_POSTS'
export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const SUBMIT_NEW_POST = 'SUBMIT_NEW_POST'
export const RECEIVE_SINGLE_POST = 'RECEIVE_SINGLE_POST'
export const GET_SINGLE_POST = 'GET_SINGLE_POST'
export const RECEIVE_CATEGORIES_POST = 'RECEIVE_CATEGORIES_POST'
export const RECEIVE_COMMENTS = 'RECEIVE_COMMENTS'
export const DELETE_COMMENT = 'DELETE_COMMENT'
export const SORTED_POSTS = 'SORTED_POSTS'
export const RECEIVE_SINGLE_COMMENT = 'RECEIVE_SINGLE_COMMENT'
export const DELETE_POST = 'DELETE_POST'
export const SORTED_COMMENTS = 'SORTED_COMMENTS'

const api = "http://localhost:3001"

// Get Categories
export function getCategories () {
  return function(dispatch){
    API.getCategories().then( categories => dispatch(receiveCategories(categories)))
  }
}

export function receiveCategories (categories) {
  return {
    type: RECEIVE_CATEGORIES,
    categories
  }
}

// Get Posts
export function getAllPosts(){
  return function(dispatch) {
    API.getAllPosts().then(posts => dispatch(receivePosts(posts)))
  }
}

export function receivePosts (posts) {
  return {
    type: RECEIVE_POSTS,
    posts
  }
}

// GET Single POSt
export function getSinglePost (post) {
  const id = post
  return function(dispatch) {
    API.getSinglePost(id).then(post => dispatch(receivePost(post)))
  }
}

export function receivePost (post) {
  return {
    type: RECEIVE_SINGLE_POST,
    post
  }
}

// Submit New Post
export function createPost(post) {
  return function(dispatch) {    
    API.createPost(post).then(post => dispatch(receivePost(post)))
  }
}

export function editPost(post, id) {
  return function(dispatch) {    
    API.editPost(post, id).then(post => dispatch(receivePost(post)))
  }
}

// Delete Post
export function deletePost (postId) {
  return function(dispatch){
    API.deletePost(postId).then( post => dispatch(postDeleted(post)))
  }
}

export function postDeleted(post) {
  return {
    type: DELETE_POST,
    post
  }
}


// Get Category Post
export function getCategoryPost (category) {
  return function(dispatch){
    API.getCategoryPosts(category).then( posts => dispatch(receiveCategoryPost(posts)))
  }
}

export function receiveCategoryPost (category_posts) {
  return {
    type: RECEIVE_CATEGORIES_POST,
    category_posts
  }
}

// GetComments
export function getComments (postId) {
  return function(dispatch){
    API.getComments(postId).then( comments => dispatch(receiveComments(comments)))
  }
}

export function receiveComments(posts_comments) {
  return {
    type: RECEIVE_COMMENTS,
    posts_comments
  }
}

// Delete Comments

export function deleteComment (commentId) {
  return function(dispatch){
    API.deleteComment(commentId).then( comment => dispatch(commentDeleted(comment)))
  }
}

export function commentDeleted(comment) {
  return {
    type: DELETE_COMMENT,
    comment
  }
}

export function sortBy (sortBy = 'votesScore', order = 'asc') { 
  return {
    type: SORTED_POSTS,
    sortBy,
    order, // these are just to update the redux store with whwat to sort by
  }
};

export function commentsSortBy (sortBy = 'votesScore', order = 'asc') { 
  console.log('commentsSortBy')
  return {
    type: SORTED_COMMENTS,
    sortBy,
    order, // these are just to update the redux store with whwat to sort by
  }
};

// Submit New Post
export function createComment(comment) {
  return function(dispatch) {    
    API.createComment(comment).then(comment => dispatch(receiveComment(comment)))
  }
}

export function editComment(id, comment) {
  return function(dispatch) {    
    API.editComment(id, comment).then(comment => dispatch(receiveComment(comment)))
  }
}

export function receiveComment(comment) {
  return {
    type: RECEIVE_SINGLE_COMMENT,
    comment
  }
}

// GET Single Comment
export function getSingleComment (comment) {
  const id = comment
  return function(dispatch) {
    API.getSingleComment(id).then(comment => dispatch(receiveComment(comment)))
  }
}

// Vote on Comment
export function votePost(id, option) {
  return function(dispatch) {    
    API.votePost(id, option).then(comment => dispatch(receiveComment(comment)))
  }
}

export function voteComment(id, option) {
  return function(dispatch) {    
    API.voteComment(id, option).then(comment => dispatch(receiveComment(comment)))
  }
}










