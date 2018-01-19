import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

class Categories extends Component {
  handleCategorySelection(category){
    this.props.onSelectCategory(category)
  }

  render() {
    return (
      <div className="categories-container">
        <ol className="categories-grid">
          {this.props.categories.map((category) => (
            <li key={category}>
              <Link to={{
                pathname: "/categories/" + category 
                  }}
                className="categories-button">
                {category} </Link>
            </li>
          ))}
        </ol>
      </div>
    )
  }
}

function mapStateToProps({ categories }, props) {
  return {
    categories: props.category ? [props.category] : Object.keys(categories)
  }
}
export default connect(mapStateToProps)(Categories);
