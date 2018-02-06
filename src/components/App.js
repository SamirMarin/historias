import React, { Component } from 'react';
import '../App.css';
import Posts from './Posts'
import Categories from './Categories'
import Post from './Post'
import PostForm from './PostForm'
import { Route } from 'react-router-dom'
import { Link } from 'react-router-dom'

class App extends Component {

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">
            <Link
              to="/"
              className="App-title-link"
            >Historias</Link>
          </h1>
        </header>
        <Route exact path="/" component={Categories}/>
        <Route exact path="/:category" render={(props) => (
          <Categories
            category={props.match.params.category}
          />
        )}/>
        <Route exact path="/" component={Posts}/>
        <Route exact path="/:category" render={(props) => (
          <Posts
            category={props.match.params.category}
          />
        )}/>
        <Route path="/:category/:postId" render={(props) => (
          <Post
            postId={props.match.params.postId}
          />
        )}/>
      <Route path="/posts/new" render={({ history }) => (
        <PostForm
          onCreatePost={() => {
            history.push('/')
          }}
        />
      )}/>
      <Route path="/:category/edit/:postId" render={(props) => (
        <PostForm
          postId={props.match.params.postId}
          onCreatePost={() => {
            props.history.push('/')
          }}
        />
      )}/>
  </div>
    );
  }
}

export default App;
