import {getBuildings, getNavBarBuildings} from '../selectors/buildingsSelector'
import React from 'react'
import {connect} from 'react-redux'

class DropdownMenuContainer extends React.Component {

    buildingChange(event) {
        this.props.history.push(`/buildings/${event.target.value}`)
    }

    render() {
        const buildings = this.props.buildings;
        const currentBuilding = this.props.currentBuilding;
        return (<div>
            <h1> {currentBuilding ? currentBuilding.name : null} </h1>
            <select className={"dropdown-container"}
                    onChange={this.buildingChange.bind(this)} value = {currentBuilding ? currentBuilding.id : "Choose a Building"}>
                <option disabled value = {"Choose a Building"}> {"Choose a Building"}</option>
                {Object.keys(buildings).map(id => {
                    return (
                        <option key = {id} value={id} > {buildings[id].name} </option>
                    )
                })}
            </select>

        </div>);
    }


}

// function mapStateToProps(state, ownProps) {
//     return {
//         buildings: getBuildings(state),
//         currentBuilding: getNavBarBuildings(ownProps.match.params.entity, ownProps.match.params.id, state),
//     };
// }


function mapDispatchToProps(dispatch) {
    return {};
}

export default DropdownMenuContainer