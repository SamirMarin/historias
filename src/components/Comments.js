import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getDate } from '../utils/helpers'
import Vote from './Vote'
import Modal from 'react-modal'
import CommentForm from './CommentForm'
import EditComment from 'react-icons/lib/ti/edit'
import SortBy from 'sort-by'
import DeleteComment from 'react-icons/lib/md/delete'
import { confirmAlert } from 'react-confirm-alert'
import 'react-confirm-alert/src/react-confirm-alert.css'
import * as Api from '../utils/api'
import { deleteComment } from '../actions'

class Comments extends Component {
  state = {
    editComment: false,
    comment: null,
  }

  openEditComment = ({ comment }) => {
    this.setState(() => ({ 
      editComment: true,
      comment: comment,
    }))
  }

  closeEditComment = () => {
    this.setState(() => ({ 
      editComment: false,
      comment: null,
    }))
  }

  onConfirmDelete(commentId) {
    Api.deleteComment(commentId)
      .then(comment => this.props.deleteComment({ deleteCommentId: comment.id, deleted: comment.deleted }))
      .catch(err => console.log(err))
  }

  deleteComment(commentId) {
      confirmAlert({
        title: 'Confirm to delete',
        message: 'Are you sure you want to delete this comment.',
        cancelLabel: 'Cancel',
        confirmLabel: 'Confirm',
        onConfirm: () => this.onConfirmDelete(commentId),
      })
  }

  render() {
    return (
      <div className="comments-container"> 
        {this.props.comments.length} Responses
        <ol className="comment-grid" >
          {this.props.comments.sort(SortBy('-timestamp')).map((comment) => (
            !comment.deleted &&
            <li key={comment.id}>
              <div className="comment-container">
                <div className="comment-author"> {comment.author} </div>
                <div className="comment-date"> {getDate(comment.timestamp)}</div>
                <div className="comment-body"> {comment.body} </div>
                <div className="comment-vote-left">
                  <Vote
                    voteScoreObject={ {
                      id: comment.id,
                      voteScore: comment.voteScore,
                      url: "comments",
                    } }
                  />
                </div>
                <div className="edit-comment-container">
                  <EditComment 
                    className="edit-comment"
                    size={30}
                    onClick={() => this.openEditComment({ comment }) }
                  />
                  <DeleteComment
                    className="delete-post"
                    size={30}
                    onClick={() => this.deleteComment(comment.id)}
                  />
                </div>
              </div>
            </li>
          ))}
        </ol>
        <Modal
          isOpen={this.state.editComment}
          className="modal"
          onRequestClose={this.closeEditComment}
          contentLabel="Modal"
          ariaHideApp={false}
        >
          <CommentForm
            comment={this.state.comment}
            onSubmitEdit={this.closeEditComment}
          />
        </Modal>


      </div>
    )
  }
}

function mapStateToProps({ posts, comments }, props) {

  return {
    comments: props.comments ? 
    props.comments.map((commentId) => comments[commentId])
    :
    []
  }
}

function mapDispatchToProps( dispatch ) {
  return {
    deleteComment: (data) => dispatch(deleteComment(data)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Comments)
