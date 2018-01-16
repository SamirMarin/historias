import { combineReducers } from 'redux'
import {
  ADD_CATEGORY
} from '../actions'

function categories (state={}, action) {
  switch (action.type) {
    case ADD_CATEGORY:
      const { category } = action
      return {
        ...state,
        [category]: category
      }
    default:
      return state
  }
}

export default combineReducers({
  categories,
})
