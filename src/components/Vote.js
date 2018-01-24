import React, { Component } from 'react'
import Arrowup from 'react-icons/lib/go/triangle-up'
import Arrowdown from 'react-icons/lib/go/triangle-down'
import { connect } from 'react-redux'
import { changeVoteScore } from '../actions'
import * as Api from '../utils/api'

class Vote extends Component {
  upVote ( voteScoreObject, vote ) {
    Api.updateVoteScore("upVote", voteScoreObject.id, voteScoreObject.url)
      .then(() => {
      vote(
        { id: voteScoreObject.id, voteScore: voteScoreObject.voteScore + 1 }
      )})
  }

  downVote ( voteScoreObject, vote ) {
    Api.updateVoteScore("downVote", voteScoreObject.id, voteScoreObject.url)
      .then(() => {
      vote(
        { id: voteScoreObject.id, 
          voteScore: voteScoreObject.voteScore - 1 }
      )})
  }

  render() {
    const { voteScoreObject, vote } = this.props
    return (
      <div className="vote-circle"> 
        { voteScoreObject && (
          <div>
            <div onClick={() => this.upVote(voteScoreObject, vote) } >
              <Arrowup 
                className="vote-triangle" 
                size={70}
              />
            </div>
            <div className="vote-score"> 
              {this.props.voteScoreObject.voteScore}
            </div>
            <div onClick={() => this.downVote(voteScoreObject, vote) } >
              <Arrowdown 
                className="vote-triangle" 
                size={70}
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
    vote: (data) => dispatch(changeVoteScore(data)),
  }
}

export default connect(() => {return {}}, mapDispatchToProps)(Vote);
