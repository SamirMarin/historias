import React, { Component } from 'react'
import { connect } from 'react-redux'

class Post extends Component {
  getDate(timestame){
    let date = new Date(timestame)
    return date.toString()
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
            <div className="post-date"> written on: {this.getDate(this.props.post.timestamp)} </div>
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
  }
}

export default connect(mapStateToProps)(Post)
