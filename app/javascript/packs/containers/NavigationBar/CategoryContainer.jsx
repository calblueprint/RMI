import {Link} from 'react-router-dom'
import React from 'react'


class CategoryContainer extends React.Component {
    render() {
        const currentCategory = this.props.currentCategory;
        const categories = this.props.categories;
        const currentBuildingId = this.props.currentBuilding ? this.props.currentBuilding.id : null;
        const remainingQuestions = this.props.remainingQuestions;
        return (
            <div>
                <h1>{currentCategory ? currentCategory.name : null}</h1>
                <div className = {"categoryList"}>
                    {Object.keys(categories).map(id => {
                    return (
                       <p key = {id}>
                         <Link
                           to= {`/buildings/${currentBuildingId}/edit/${categories[id].id}`}
                           key = {categories[id].id}>
                           {categories[id].name} </Link>
                       </p>
                    )
                })}
                </div>
                <div>
                    <p> {remainingQuestions} Questions Remaining</p>
                </div>
            </div>

        )
    }
}
export default CategoryContainer
