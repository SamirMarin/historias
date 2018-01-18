import React, { Component } from 'react';
import '../App.css';
import Posts from './Posts'
import Categories from './Categories'
import { Route } from 'react-router-dom'

class App extends Component {

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Historias</h1>
        </header>
        <Route path="/category/:category" render={(props) => (
          <Categories
            category={props.match.params.category}
          />
        )}/>
        <Route exact path="/" render={() => (
          <Categories/>
        )}/>
        <h2> Posts </h2>
        <Route path="/category/:category" render={(props) => (
          <Posts
            category={props.match.params.category}
          />
        )}/>
        <Route exact path="/" render={() => (
          <Posts/>
        )}/>
      </div>
    );
  }
}

export default App;
