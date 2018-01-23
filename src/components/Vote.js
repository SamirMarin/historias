import React, { Component } from 'react'
import Arrowup from 'react-icons/lib/go/triangle-up'
import Arrowdown from 'react-icons/lib/go/triangle-down'



class Vote extends Component {
  render() {
    return (
      <div className="vote-circle"> 
        <Arrowup className="vote-triangle" size={70}/>
        <div className="vote-score"> up votes </div>
        <Arrowdown className="vote-triangle" size={70}/>
      </div>
    )
  }
}

export default Vote;
