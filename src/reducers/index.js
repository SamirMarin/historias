import { combineReducers } from 'redux'
import {
  ADD_CATEGORY,
  ADD_POST
} from '../actions'

function categories (state={}, action) {
  switch (action.type) {
    case ADD_CATEGORY:
      const { category } = action
      return {
        ...state,
        [category.name]: []
      }
    case ADD_POST:
      const { post } = action
      return {
        ...state,
        [post.category]: [...state[post.category], post.id]
      }
    default:
      return state
  }
}

function posts (state={}, action) {
  switch (action.type) {
    case ADD_POST:
      const { post } = action
      return {
        ...state,
        [post.id]: post
      }
    default:
      return state
  }
}

export default combineReducers({
  categories,
  posts,
})
