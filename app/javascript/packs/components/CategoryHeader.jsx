import { Link } from 'react-router-dom'
import React from 'react'


class CategoryHeader extends React.Component {
  render() {
    const categoryName = this.props.category.name;
    const categoryDescription = this.props.category.description;
    const categoryNumber = this.props.number;
    const categoryId = this.props.category.id;
    const buildingId = this.props.buildingId;
    return (
      <div>
        <div className="category__circle"> {categoryNumber} </div>
        <p>{categoryName}</p>
        <p>{categoryDescription}</p>
        <Link
          to ={`/buildings/${buildingId}/edit/${categoryId}`}
          key = {categoryId}>
          Edit
        </Link>

      </div>

    )
  }
}

export default CategoryHeader