import React, { Component } from 'react'
import { connect } from 'react-redux'
import Categories from './Categories'
import uuidv1 from 'uuid/v1'
import * as Api from '../utils/api'
import { addPost, editPost } from '../actions'


class PostForm extends Component {
  state = {
    title: "",
    body: "",
    author: "",
    category: "",
  }

  constructor(props) {
    super(props)
    if (this.props.post) {
      this.state = {
        title: this.props.post.title,
        body: this.props.post.body,
        author: this.props.post.author,
        category: this.props.post.category,
      }
    }
  }

  componentWillReceiveProps(nextProps){
    if (this.props !== nextProps){
      if(nextProps.post){
        this.setState({
          title: nextProps.post.title,
          body: nextProps.post.body,
          author: nextProps.post.author,
          category: nextProps.post.category,
        })
      }
    }
  }

  handleChangeTitle(value) {
    this.setState({ title: value })
  }

  handleChangeBody(value) {
    this.setState({ body: value })
  }

  handleChangeAuthor(value) {
    if(!this.props.post){
      this.setState({ author: value })
    }
  }

  selectCategory = (category) => {
    if(!this.props.post) {
      this.setState({ category })
    }
  }

  handleSubmit(e) {
    e.preventDefault()

    if (this.state.category === "") {
      alert("Please choose a category")
      return
    } else if (this.state.title === "") {
      alert("Please give the post a title")
      return
    } else if (this.state.body === "") {
      alert("Please the post a body")
      return
    } else if (this.state.author === "") {
      alert("Please tell us who the author is")
      return
    }

    if (this.props.post) {
      let post = {
        title: this.state.title,
        body: this.state.body,
      }

      Api.editPost(post, this.props.post.id)
        .then(post => this.props.editPost({ postId: post.id, title: post.title, body: post.body }))
        .catch(err => console.log(err))

    } else {
      let post = {
        id: uuidv1(),
        timestamp: Date.now(),
        title: this.state.title,
        body: this.state.body,
        author: this.state.author,
        category: this.state.category,
      }

      Api.addPost(post)
        .then(post => this.props.addPost({ post }))
        .catch(err => console.log(err))
    }

    this.props.onCreatePost()
  }

  render() {
    return (
      <div className="comment-form-container">
        <div className="comment-form-title">
          Let's hear it! Post and publish it!
        </div>
        <form onSubmit ={(e) => this.handleSubmit(e)} >
          <div className="comment-form-area">
            <Categories
              newPost={true}
              onSelectCategory={this.selectCategory}
              categorySelected={this.state.category}
            />
            <div className="form-padding">
              <textarea 
                className="post-text-box-title"
                placeholder="Whats the title"
                value={this.state.title}
                onChange={(event) => this.handleChangeTitle(event.target.value)}
              />
            </div>
            <br/>
            <div className="form-padding">
              <textarea 
                className="post-text-box-area"
                placeholder="let's hear what you have to say about this post!"
                value={this.state.body}
                onChange={(event) => this.handleChangeBody(event.target.value)}
              />
            </div>
            <br/>
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
    addPost: (data) => dispatch(addPost(data)),
    editPost: (data) => dispatch(editPost(data)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostForm );
