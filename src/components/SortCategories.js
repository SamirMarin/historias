import React, { Component } from 'react'

class SortCategories extends Component {
  state = {
    categoryColor: {}
  }

  constructor(props) {
    super(props)
    if (props.defaultSortCategory) {
      this.state = {
        categoryColor: {
          ...this.state.categoryColor,
          [props.defaultSortCategory]: '#939596'
        },
      }
    }
  }

  setStateCategoryColor (category, color) {
    this.setState(state => ({
      categoryColor: {
        ...state.categoryColor,
        [category]: color
      }
    }))
  }

  handleSortSelection(sortCategory){
    this.props.sortCategories.filter((category) => (category !== sortCategory)).forEach((category) => {
      this.setStateCategoryColor(category, '#c5c9ca')
    })
    this.setStateCategoryColor(sortCategory, '#939596')
    this.props.onSelectSortBy(sortCategory)
  }

  render() {
    return (
      <div className="sort-categories-container">
        Sort By:
        <ol className="sort-categories-grid">
          {this.props.sortCategories.map((sortCategory) => (
            <li key={sortCategory}>
              <div 
                className="sort-categories-button"
                style={{backgroundColor: this.state.categoryColor[sortCategory]}}
                onClick={() => this.handleSortSelection(sortCategory)}
              >
                {sortCategory}
              </div>
            </li>
          ))}
        </ol>
      </div>
    )
  }
}

export default SortCategories
