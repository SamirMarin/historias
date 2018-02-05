import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getDate } from '../utils/helpers'
import Vote from './Vote'
import Modal from 'react-modal'
import CommentForm from './CommentForm'
import EditComment from 'react-icons/lib/ti/edit'
import SortBy from 'sort-by'

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

  render() {
    return (
      <div className="comments-container"> 
        {this.props.comments.length} Responses
        <ol className="comment-grid" >
          {this.props.comments.sort(SortBy('-timestamp')).map((comment) => (
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

export default connect(mapStateToProps)(Comments)
