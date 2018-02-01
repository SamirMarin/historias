import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as Api from '../utils/api'
import uuidv1 from 'uuid/v1'
import { addComment } from '../actions'

class CommentForm extends Component {
  state = {
    author: "",
    body: "",
  }

  handleChangeAuthor(value) {
    this.setState({author: value})
  }

  handleChangeBody(value) {
    this.setState({body: value})
  }

  handleSubmit(e) {
    e.preventDefault()

    if (this.state.author === "" ) {
      alert("please enter who you are")
      return
    } else if (this.state.body === "") {
      alert("please enter a comment")
      return
    }

    let comment = {
      id: uuidv1(),
      timestamp: Date.now(),
      body: this.state.body,
      author: this.state.author,
      parentId: this.props.postId,
    }

    Api.addComment(comment)
      .then(comment =>  {
        this.props.addComment({ comment })
        this.handleChangeAuthor("")
        this.handleChangeBody("")
      })
      .catch(err => console.log(err))
  }

  render() {
    return (
      <div className="comment-form-container">
        <div className="comment-form-title">
          Write a response... 
        </div>
        <form onSubmit ={(e) => this.handleSubmit(e)} >
          <div className="comment-form-area">
            <div className="">
              <input 
                className="author-area"
                placeholder="who are you?"
                type="text"
                value={this.state.author}
                onChange={(event) => this.handleChangeAuthor(event.target.value)}
              />
            </div>
            <br/>
            <div className="form-padding">
              <textarea 
                className="text-box-area"
                placeholder="let's hear what you have to say about this post!"
                value={this.state.body}
                onChange={(event) => this.handleChangeBody(event.target.value)}
              />
            </div>
            <br/>
            <input 
              type="submit"
              className="author-area"
            />
          </div>
        </form>
      </div>
    )
  }
}

function mapDispatchToProps( dispatch ) {
  return {
    addComment: (data) => dispatch(addComment(data)),
  }
}

export default connect(() => {return {}}, mapDispatchToProps)(CommentForm);
