import React, { Component } from 'react';
import '../App.css';
import { connect } from 'react-redux'
import Posts from './Posts'
import Categories from './Categories'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Historias</h1>
        </header>
        <Categories/>
        <h2> Posts </h2>
        <Posts
          category={null}
        />
      </div>
    );
  }
}

export default connect()(App);
