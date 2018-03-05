import {Link} from 'react-router-dom'
import React from 'react'


class CategoryContainer extends React.Component {
    render() {
        const currentCategory = this.props.currentCategory;
        const categories = this.props.categories;
        const currentBuildingId = this.props.currentBuilding.id;
        const mode = this.props.mode;
        const url = this.props.url;
        return (
            <div>
                <h1>{currentCategory ? currentCategory.name : "No Category Selected"}</h1>
                <div className = {"categoryList"}>
                    {Object.keys(categories).map(id => {
                    return (
                       <p key = {id}> <Link to= {currentCategory ? `/buildings/${currentBuildingId}/${mode}/${id}` : url} key = {id}> {categories[id].name} </Link>
                       </p>
                    )
                })}
                </div>
            </div>

        )
    }
}
export default CategoryContainer
