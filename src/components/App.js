import React, { Component } from 'react';
import '../App.css';
import * as Api from '../utils/api'
import { connect } from 'react-redux'
import Posts from './Posts'

class App extends Component {
  state = {
    categories: [],
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
    return category
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
        <h3> Posts </h3>
        <Posts
          category={null}
        />
      </div>
    );
  }
}

export default connect()(App);
