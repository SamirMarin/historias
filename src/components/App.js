import React, { Component } from 'react';
import '../App.css';
import * as Api from '../utils/api'
import { connect } from 'react-redux'
//import { addCategory, addPost } from '../actions'

class App extends Component {
  state = {
    categories: [],
    posts: [],
  }

  componentDidMount() {
    Api.getCategories().then((categories) => {
      this.setState({ categories })
    })
    Api.getPosts().then((posts) => {
      this.setState({ posts })
    })
  }


  getAndSetCategory(category) {
    //this.props.dispatch(addCategory({ category }))
    return category
  }
  getAndSetPost(post){
    //this.props.dispatch(addPost({ post }))
    return post.title
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Historias</h1>
        </header>
        <div className="categories-container">
            {this.state.categories.map((category) => (
              <button key={category.name} className="categories-button"> { this.getAndSetCategory(category.name) } </button>
            ))}
        </div>
        <div className="categories-container">
            {this.state.posts.map((post) => (
              <button key={post.id} className="categories-button"> { this.getAndSetPost(post) } </button>
            ))}
        </div>
      </div>
    );
  }
}

export default connect()(App);
