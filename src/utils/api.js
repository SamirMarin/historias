const api = "https://historias-api.herokuapp.com"
//const api = "http://localhost:3001"

// Generate a unique token to work with your own data on the backend server.
let token = localStorage.token
if (!token)
  token = localStorage.token = Math.random().toString(36).substr(-8)

const headers = {
  'Accept': 'application/json',
  'Authorization': token
}

export const getCategories = () =>
  fetch(`${api}/categories`, { headers })
    .then(res => res.json())
    .then(data => data.categories)

export const getPosts = () =>
  fetch(`${api}/posts`, { headers })
    .then(res => res.json())
    .then(data => data)

export const getComments = (id) =>
  fetch(`${api}/posts/${id}/comments`, { headers })
    .then(res => res.json())
    .then(data => data)

export const updateVoteScore = (option, id, url) =>
  fetch(`${api}/${url}/${id}`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ option })
  }).then(res => {
    if(res.ok) {
      return res.json()
    } else {
      return Promise.reject(new Error(res.statusText))
    }
  }).then(data => data.voteScore)

export const addComment = (comment) =>
  fetch(`${api}/comments`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(comment)
  }).then(res => {
    if(res.ok) {
      return res.json()
    } else {
      return Promise.reject(new Error(res.statusText))
    }
  })

export const addPost = (post) =>
  fetch(`${api}/posts`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(post)
  }).then(res => {
    if(res.ok) {
      return res.json()
    } else {
      return Promise.reject(new Error(res.statusText))
    }
  })

export const editPost = (post, id) => 
  fetch(`${api}/posts/${id}`, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(post)
  }).then(res => {
    if(res.ok) {
      return res.json()
    } else {
      return Promise.reject(new Error(res.statusText))
    }
  })

export const editComment = (comment, id) => 
  fetch(`${api}/comments/${id}`, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(comment)
  }).then(res => {
    if(res.ok) {
      return res.json()
    } else {
      return Promise.reject(new Error(res.satusText))
    }
  })

export const deletePost = (id) =>
  fetch(`${api}/posts/${id}`, {
    method: 'DELETE',
    headers,
  }).then(res => {
    if(res.ok) {
      return res.json()
    } else {
      return Promise.reject(new Error(res.satusText))
    }
  })

  

