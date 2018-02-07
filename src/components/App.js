import React, { Component } from 'react';
import '../App.css';
import Posts from './Posts'
import Post from './Post'
import PostForm from './PostForm'
import { Route, Link, Switch } from 'react-router-dom'
import NoMatch from './NoMatch'

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
        <Switch>
          <Route exact path="/" component={Posts}/>
          <Route exact path="/:category" render={(props) => (
            <Posts
              category={props.match.params.category}
            />
          )}/>
          <Route path="/posts/new" render={({ history }) => (
            <PostForm
              onCreatePost={() => {
                history.push('/')
              }}
            />
          )}/>
          <Route exact path="/:category/:postId" render={(props) => (
            <Post
              postId={props.match.params.postId}
              onDeletePost={() => {
                props.history.push('/')
              }}
            />
          )}/>
          <Route exact path="/:category/edit/:postId" render={(props) => (
            <PostForm
              postId={props.match.params.postId}
              onCreatePost={() => {
                props.history.push("/" + props.match.params.category + "/" 
                  + props.match.params.postId)
              }}
            />
          )}/>
          <Route component={NoMatch}/>
      </Switch>
    </div>
    )
  }
}

export default App;
