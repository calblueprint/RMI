import { Link } from 'react-router-dom'
import React from 'react'


class CategoryHeader extends React.Component {
  render() {
    const categoryName = this.props.category.name;
    const categoryDescription = this.props.category.description;
    const categoryNumber = this.props.number;
    return (
      <div>
        <p> {categoryNumber} </p>
        <p>{categoryName}</p>
        <p>{categoryDescription}</p>
      </div>

    )
  }
}

export default CategoryHeader