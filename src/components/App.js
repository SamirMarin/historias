import React, { Component } from 'react';
import '../App.css';
import * as Api from '../utils/api'
import { connect } from 'react-redux'
import { addCategory } from '../actions'

class App extends Component {
  state = {
    categories: []
  }

  componentDidMount() {
    Api.getCategories().then((categories) => {
      this.setState({ categories })
    })
  }

  getAndSetCategory(category) {
    this.props.dispatch(addCategory({ category }))
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
      </div>
    );
  }
}

export default connect()(App);
