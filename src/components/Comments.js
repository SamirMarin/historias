import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getDate } from '../utils/helpers'


class Comments extends Component {
  render() {
    return (
      <div className="comments-container"> 
        Responses
        <ol className="comment-grid" >
          {this.props.comments.map((comment) => (
            <li key={comment.id}>
              <div className="comment-container">
                <div className="comment-author"> {comment.author} </div>
                <div className="comment-date"> {getDate(comment.timestamp)}</div>
                <div className="comment-body"> {comment.body} </div>
              </div>
            </li>
          ))}
        </ol>


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
