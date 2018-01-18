import React, { Component } from 'react'
import { connect } from 'react-redux'

class Categories extends Component {
  render() {
    return (
      <div className="categories-container">
        <ol className="categories-grid">
          {this.props.categories.map((category) => (
            <li key={category}>
              <div className="categories-button">
                {category}
              </div>
            </li>
          ))}
        </ol>
      </div>
    )
  }
}

function mapStateToProps({ categories }) {
  return {
    categories: Object.keys(categories)
  }
}
export default connect(mapStateToProps)(Categories);
