import * as Api from '../utils/api'

export const ADD_CATEGORY = 'ADD_CATEGORY'
export const ADD_POST = 'ADD_POST'
export const EDIT_POST = 'EDIT_POST'
export const ADD_COMMENT = 'ADD_COMMENT'
export const EDIT_COMMENT = 'EDIT_COMMENT'
export const POST_VOTE = 'POST_VOTE'
export const COMMENT_VOTE = 'COMMENT_VOTE'

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

export function editPost ({ postId, title, body }) {
  return {
    type: EDIT_POST,
    postId,
    title,
    body,
  }
}

export function addComment({ comment }) {
  return {
    type: ADD_COMMENT,
    comment,
  }
}

export function editComment({ commentId, body }) {
  return {
    type: EDIT_COMMENT,
    commentId,
    body,
  }
}

export function postVote({ voteScore, id }){
  return {
    type: POST_VOTE,
    id,
    voteScore,
  }
}

export function commentVote({ voteScore, id }){
  return {
    type: COMMENT_VOTE,
    id,
    voteScore,
  }
}

export const fetchComments = (id) => dispatch => (
  Api
  .getComments(id)
  .then(comments => comments.forEach(function(comment) {
    dispatch(addComment({ comment }))
  }))
)

export const fetchPosts = () => dispatch => (
  Api
  .getPosts()
  .then(posts => posts.forEach(function(post) {
    dispatch(addPost({ post }))
    dispatch(fetchComments(post.id))
  }))
)

export const fetchCategories = () => dispatch => (
  Api
  .getCategories()
  .then(
    (categories) => { categories.forEach(function(category) {
      dispatch(addCategory({ category }))}
    )}
  ).then(
    () => dispatch(fetchPosts()))
)
