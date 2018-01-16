export const ADD_CATEGORIES = 'ADD_CATEGORIES'
export const ADD_POST = 'ADD_POST'

export function addCategories ({}) {
  return {
    type: ADD_CATEGORIES,
  }
}

export function addPost ({ id, timestamp, title, body, author, category, voteScore, deleted }) {
  return {
    type: ADD_POST,
    id,
    timestamp,
    title,
    body,
    author,
    category,
    voteScore,
    deleted,
  }
}
