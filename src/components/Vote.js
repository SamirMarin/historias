import React, { Component } from 'react'
import Arrowup from 'react-icons/lib/go/triangle-up'
import Arrowdown from 'react-icons/lib/go/triangle-down'
import { connect } from 'react-redux'
import { postVote, commentVote } from '../actions'
import * as Api from '../utils/api'

class Vote extends Component {
  vote ( typeVote, voteScoreObject, voteFn ) {
    Api.updateVoteScore(typeVote, voteScoreObject.id, voteScoreObject.url)
      .then((voteScore) => {
        voteFn({ id: voteScoreObject.id, voteScore: voteScore })
      })
      .catch((error) => console.log(error))
  }

  typeOfVote(url){
    return url === "posts" ? this.props.postVote : this.props.commentVote
  }

  render() {
    const { voteScoreObject } = this.props
    return (
      <div className="vote-circle"> 
        { voteScoreObject && (
          <div>
            <div onClick={() => this.vote("upVote", voteScoreObject, this.typeOfVote(voteScoreObject.url)) } >
              <Arrowup 
                className="vote-triangle" 
                size={40}
              />
            </div>
            <div className="vote-score"> 
              {this.props.voteScoreObject.voteScore}
            </div>
            <div onClick={() => this.vote( "downVote", voteScoreObject, this.typeOfVote(voteScoreObject.url)) } >
              <Arrowdown 
                className="vote-triangle" 
                size={40}
              />
            </div>
          </div>
        )}
      </div>
    )
  }
}

function mapDispatchToProps( dispatch ) {
  return {
    postVote: (data) => dispatch(postVote(data)),
    commentVote: (data) => dispatch(commentVote(data)),
  }
}

export default connect(() => {return {}}, mapDispatchToProps)(Vote);
