import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Vote from './Vote'
import AddPost from 'react-icons/lib/md/add'
import EditPost from 'react-icons/lib/ti/edit'
import DeletePost from 'react-icons/lib/md/delete'
import SortCategories from './SortCategories'
import sortBy from 'sort-by'
import Loading from 'react-loading'
import { confirmAlert } from 'react-confirm-alert'
import 'react-confirm-alert/src/react-confirm-alert.css'
import * as Api from '../utils/api'
import { deletePost } from '../actions'

class Posts extends Component {
  state = {
    sortBy: 'timestamp'
  }

  setSelectSortBy = (sortBy) => {
    this.setState({ sortBy })
  }

  onConfirmDelete(postId) {
    Api.deletePost(postId)
      .then(post => this.props.deletePost({ deletePostId: post.id, deleted: post.deleted }))
      .catch(err => console.log(err))
  }

  deletePost(postId) {
      confirmAlert({
        title: 'Confirm to delete',
        message: 'Are you sure you want to delete this post.',
        cancelLabel: 'Cancel',
        confirmLabel: 'Confirm',
        onConfirm: () => this.onConfirmDelete(postId),
      })
  }

  render() {
    return (
      <div>
        {this.props.posts.length === 0
            ? <Loading type="spin" color = "#222" className="loading" delay={200} />
            : <div className="posts-container">
              <h2> Posts </h2>
              <SortCategories
                sortCategories = {["timestamp", "voteScore", "title", "author"]}
                defaultSortCategory={this.state.sortBy}
                onSelectSortBy={this.setSelectSortBy}
              />
              <ol className="posts-grid">
                {this.props.posts.sort(sortBy(this.state.sortBy)).map((post) => (
                  !post.deleted &&
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
                          to={{ pathname: "/posts/edit/" + post.id }}
                          className="edit-post-icon"
                        >
                          <EditPost 
                            className="edit-post"
                            size={30}
                          />
                        </Link>
                        <DeletePost
                          className="delete-post"
                          size={30}
                          onClick={() => this.deletePost(post.id)}
                        />
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
            </div>}
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

function mapDispatchToProps( dispatch ) {
  return {
    deletePost: (data) => dispatch(deletePost(data)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Posts);
