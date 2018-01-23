import React, { Component } from 'react'
import { connect } from 'react-redux'
import Comments from './Comments'
import { getDate } from '../utils/helpers'
import Vote from './Vote'

class Post extends Component {
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
              post={this.props.post}
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

export default connect(mapStateToProps)(Post)
