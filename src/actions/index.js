import * as Api from '../utils/api'

export const ADD_CATEGORY = 'ADD_CATEGORY'
export const ADD_POST = 'ADD_POST'

export function addCategory ({ category }) {
  return {
    type: ADD_CATEGORY,
    category,
  }
}

export function addPost ({ post }) {
  return {
    type: ADD_POST,
    post,
  }
}

export const fetchCategories = () => dispatch => (
  Api
  .getCategories()
  .then(categories => categories.forEach(function(category) {
    dispatch(addCategory({ category }))
  }))
)

export const fetchPosts = () => dispatch => (
  Api
  .getPosts()
  .then(posts => posts.forEach(function(post) {
    dispatch(addPost({ post }))
  }))
)
