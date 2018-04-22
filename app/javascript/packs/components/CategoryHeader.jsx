import {Link} from 'react-router-dom'
import React from 'react'


class CategoryHeader extends React.Component {
  render() {
    const categoryName = this.props.category.name;
    const categoryDescription = this.props.category.description;
    const categoryNumber = this.props.number;
    const categoryId = this.props.category.id;
    const buildingId = this.props.buildingId;
    return (
      <div className="category__flex">
        <div className="category__header">
          <div className="category__number"> {categoryNumber} </div>
          <div className="category__name">{categoryName}</div>
          <div className="category__description">{categoryDescription}</div>
        </div>
        <Link
          to={`/buildings/${buildingId}/edit/${categoryId}`}
          key={categoryId}
          className="btn btn--secondary"
        >
          Edit
        </Link>
      </div>

    )
  }
}

export default CategoryHeader