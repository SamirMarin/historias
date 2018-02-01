import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

class Categories extends Component {
  state = {
    categoryColor: {}
  }

  setStateCategoryColor (category, color) {
    this.setState(state => ({
      categoryColor: {
        ...state.categoryColor,
        [category]: color
      }
    }))
  }

  handleCategorySelection(category){
    this.props.onSelectCategory(category)
    this.props.categories.filter((cate) => (cate !== category)).forEach((cate) => {
      this.setStateCategoryColor(cate, '#222')
    })
    this.setStateCategoryColor(category, '#949090')
  }

  render() {
    return (
      <div className="categories-container">
        <ol className="categories-grid">
          {this.props.categories.map((category) => (
            <li key={category}>
              { this.props.newPost ?
                <div 
                  className="categories-button-new-post"
                  style={{backgroundColor: this.state.categoryColor[category]}}
                  onClick={() => this.handleCategorySelection(category)}
                > 
                  {category} </div> 
                :
                <Link to={{
                  pathname: "/categories/" + category 
                }}
                className="categories-button">
                {category} </Link> }
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
