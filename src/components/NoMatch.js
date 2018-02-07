import React, {Component} from 'react'

class NoMatch extends Component {
  render () {
    return (
      <div>
        <h3>
          This page is not available
        </h3>
        <p>
          This Link you followed may be broken, or the page may have been removed
        </p>
      </div>
    )
  }
} 

export default NoMatch;
