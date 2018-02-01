import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Vote from './Vote'
import AddPost from 'react-icons/lib/md/add'
import EditPost from 'react-icons/lib/ti/edit'

class Posts extends Component {
  render() {
    return (
      <div className="posts-container">
        <h2> Posts </h2>
        <ol className="posts-grid">
          {this.props.posts.map((post) => (
            <li key={post.id}>
              <div className="posts-box">
                <div className="list-post-title"> 
                  <h1>
                    <Link
                      to={{ pathname: "/posts/" + post.id }}
                      className="list-post-title-link"
                    >{post.title}</Link>
                  </h1>
                </div>
                <h4> By: {post.author} </h4>
                <Vote
                  voteScoreObject={ {
                    id: post.id, 
                    voteScore: post.voteScore,
                    url: "posts",
                  } }
                />
                <div className="edit-post-container">
                  <Link
                    to={{ pathname: "posts/edit/" + post.id }}
                    className="edit-post-icon"
                  >
                  <EditPost 
                    className="edit-post"
                    size={30}
                  />
                </Link>
                </div>
              </div>
            </li>
          ))}
        </ol>
        <Link
          to="posts/new"
          className="posts-add"
        > 
          <AddPost size={70}/> 
        </Link>
      </div>

    )
  }

}

function mapStateToProps({ posts, categories }, props) {
  if (props.category && (props.category in categories)) {
    return {
      posts: categories[props.category].map((postId) => (posts[postId]))  
    }
  } else {
    return {
      posts: Object.keys(categories).reduce((posts_array, category) => {
        posts_array = posts_array.concat(categories[category].map((postId) => (posts[postId])))
        return posts_array
      }, [])
    }
  }
}

export default connect(mapStateToProps)(Posts);
