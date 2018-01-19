import React, { Component } from 'react';
import '../App.css';
import Posts from './Posts'
import Categories from './Categories'
import Post from './Post'
import { Route } from 'react-router-dom'

class App extends Component {

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Historias</h1>
        </header>
        <Route exact path="/" component={Categories}/>
        <Route path="/categories/:category" render={(props) => (
          <Categories
            category={props.match.params.category}
          />
        )}/>
        <Route exact path="/" component={Posts}/>
        <Route path="/categories/:category" render={(props) => (
          <Posts
            category={props.match.params.category}
          />
        )}/>
        <Route path="/posts/:postId" render={(props) => (
          <Post
            postId={props.match.params.postId}
          />
        )}/>
      </div>
    );
  }
}

export default App;
