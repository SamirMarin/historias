import React, { Component } from 'react'
import { connect } from 'react-redux'
import Comments from './Comments'
import { getDate } from '../utils/helpers'
import Vote from './Vote'
import CommentForm from './CommentForm'
import { Link } from 'react-router-dom'
import DeletePost from 'react-icons/lib/md/delete'
import EditPost from 'react-icons/lib/ti/edit'
import { confirmAlert } from 'react-confirm-alert'
import 'react-confirm-alert/src/react-confirm-alert.css'
import * as Api from '../utils/api'
import { deletePost } from '../actions'

class Post extends Component {

  onConfirmDelete(postId) {
    Api.deletePost(postId)
      .then(post => this.props.deletePost({ deletePostId: post.id, deleted: post.deleted }))
      .catch(err => console.log(err))

    this.props.onDeletePost()
  }

  deletePost(postId) {
      confirmAlert({
        title: 'Confirm to delete',
        message: 'Are you sure you want to delete this post.',
        cancelLabel: 'Cancel',
        confirmLabel: 'Confirm',
        onConfirm: () => this.onConfirmDelete(postId),
      })
  }

  render() {
    return (
      <div className="post-container">
        {this.props.post && (
          <div>
            <div className="post-title"> {this.props.post.title} </div>
            <div className="post-author"> by: 
              <i> {this.props.post.author} </i> 
            </div>
            <div className="post-body"> {this.props.post.body} </div>
            <div className="post-date"> written on: {getDate(this.props.post.timestamp)} </div>
            <Vote
              voteScoreObject={ {
                id: this.props.post.id, 
                voteScore: this.props.post.voteScore,
                url: "posts",
              } }
            />
            <div className="edit-post-container-post">
              <Link
                to={{ pathname: "/" + this.props.post.category + "/edit/" + this.props.post.id }}
                className="edit-post-icon-post"
              >
                <EditPost 
                  className="edit-post"
                  size={30}
                />
              </Link>
              <div>
                <DeletePost
                  className="delete-post"
                  size={30}
                  onClick={() => this.deletePost(this.props.post.id)}
                />
              </div>
            </div>
            <CommentForm
              postId = {this.props.post.id}
            />
            <Comments
              comments={this.props.post.comments}
            />
          </div>
        )}
      </div>
    )
  }
}

function mapStateToProps({ posts }, props) {
  if (props.postId && (props.postId in posts)) {
    return {
      post: posts[props.postId]
    }
  } else {
    return {}
  }
}

function mapDispatchToProps( dispatch ) {
  return {
    deletePost: (data) => dispatch(deletePost(data)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Post)
