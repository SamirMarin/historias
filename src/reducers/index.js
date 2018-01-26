import { combineReducers } from 'redux'
import {
  ADD_CATEGORY,
  ADD_POST,
  ADD_COMMENT,
  POST_VOTE,
  COMMENT_VOTE,
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
        [post.id]: {
          ...post,
          'comments': []
        }
      }
    case ADD_COMMENT:
      const { comment } = action
      return {
        ...state,
        [comment.parentId]:{
          ...state[comment.parentId],
          'comments': [...state[comment.parentId].comments, comment.id]
        }
      }
    case POST_VOTE:
      const { id, voteScore } = action
      return {
        ...state,
        [id]: {
          ...state[id],
          'voteScore': voteScore
        }
      }
    default:
      return state
  }
}

function comments (state={}, action) {
  switch (action.type) {
    case ADD_COMMENT:
      const { comment } = action
      return {
        ...state,
        [comment.id]: comment
      }
    case COMMENT_VOTE:
      const { id, voteScore } = action
      return {
        ...state,
        [id]: {
          ...state[id],
          'voteScore': voteScore
        }
      }
    default:
      return state
  }
}

export default combineReducers({
  categories,
  posts,
  comments,
})
