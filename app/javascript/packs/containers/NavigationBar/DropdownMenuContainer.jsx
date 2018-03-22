import {getBuildings, getNavBarBuildings} from '../selectors/buildingsSelector'
import React from 'react'
import {connect} from 'react-redux'

class DropdownMenuContainer extends React.Component {
  //event.target.value should be a building ID (user clicks on a building in a dropdown and we extract the id)
  buildingChange(event) {
    this.props.history.push(`/buildings/${event.target.value}`)
  }

  render() {
    const buildings = this.props.buildings;
    const currentBuilding = this.props.currentBuilding;
    return (<div>
      <h1> {currentBuilding ? currentBuilding.name : null} </h1>
      <select onChange={this.buildingChange.bind(this)}
              value={currentBuilding ? currentBuilding.id : "Choose a Building"}>
        <option disabled value={"Choose a Building"}> {"Choose a Building"}</option>
        {Object.keys(buildings).map(id => {
          return (
            <option key={id} value={id}> {buildings[id].name} </option>
          )
        })}
      </select>

    </div>);
  }

}

export default DropdownMenuContainer;
