import {Link} from 'react-router-dom'
import React from 'react'


class CategoryContainer extends React.Component {
    render() {
        const currentCategory = this.props.currentCategory;
        const categories = this.props.categories;
        const currentBuildingId = this.props.currentBuilding.id;
        return (
            <div>
                <h1>{currentCategory ? currentCategory.name : "No Category Selected"}</h1>
                <div className = {"categoryList"}>
                    {Object.keys(categories).map(id => {
                    return (
                       <p key = {id}> <Link to= {`/buildings/${currentBuildingId}/edit/${id}`} key = {id}> {categories[id].name} </Link>
                       </p>
                    )
                })}
                </div>
            </div>

        )
    }
}
export default CategoryContainer
