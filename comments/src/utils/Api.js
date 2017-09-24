const api = "http://localhost:3001"

const headers = {
  'Accept': 'application/json',
  'Authorization': 'kjdaklsjddm90832'
}

export const getCategories = () =>
  fetch(`${api}/categories`, { headers })
    .then((res) => res.json())

export const getAllPosts = () =>
  fetch(`${api}/posts`, { headers })
  .then((res) => res.json())

export const getSinglePost = (postId) =>
  fetch(`${api}/posts/${postId}`, { headers })
  .then((res) => res.json())

export const createPost = (post) =>
  fetch(`${api}/posts`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(post),
  }).then((res) => res.json())

export const editPost = (post, id) =>
  fetch(`${api}/posts/${id}`, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(post),
  }).then((res) => res.json())


export const getCategoryPosts = (category) =>
  fetch( `${api}/${category}/posts`, { headers })
  .then((res) => res.json())

export const getComments = (postId) =>
  fetch(`${api}/posts/${postId}/comments`, { headers })
  .then((res) => res.json())

export const deleteComment = (commentId) =>
  fetch(`${api}/comments/${commentId}`, {
    headers, 
    method: 'DELETE',
  }) .then((res) => res.json())

export const createComment = (comment) =>
  fetch(`${api}/comments`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(comment),
  }).then((res) => res.json())

export const editComment = (id, comment) =>
  fetch(`${api}/comments/${id}`, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(comment),
  }).then((res) => res.json())

export const deletePost = (postId) =>
  fetch(`${api}/posts/${postId}`, {
    headers, 
    method: 'DELETE',
  }) .then((res) => res.json())

export const getSingleComment = (commentId) =>
  fetch(`${api}/comments/${commentId}`, { headers })
  .then((res) => res.json())

export const votePost = (id, option) =>
  fetch(`${api}/posts/${id}`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(option),
  }).then((res) => res.json())


export const voteComment = (id, option) =>
  fetch(`${api}/comments/${id}`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(option),
  }).then((res) => res.json())


    // | `POST /posts/:id` | Used for voting on a post. | **option** - [String]: Either `"upVote"` or `"downVote"`. |




