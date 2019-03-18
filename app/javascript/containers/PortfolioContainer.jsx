import React from 'react';

import * as BuildingActions from '../actions/buildings';
import { loadInitialState } from '../actions/initialState';
import { getBuildingsByPortfolio } from '../selectors/buildingsSelector';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PortfolioBuildingDetailsContainer from './PortfolioBuildingDetailsContainer';

class PortfolioContainer extends React.Component {
  groupBuildingsByType() {
    let buildingTypesDic = {};
    let buildings = this.props.buildings;
    for (let i = 0; i < buildings.length; i++) {
      let id = buildings[i].building_type_id;
      if (buildingTypesDic[id] == null) {
        buildingTypesDic[id] = [buildings[i]]
      }
      buildingTypesDic[id].push(buildings[i]);
    }
    return buildingTypesDic;
  }
  

  // getContainerByBuildingType() {
  //   for (let key in this.buildingByType) {

  //   }
  //     return (<PortfolioBuildingDetailsContainer buildings={buildingGroup} buildingTypeId={buildingGroup.id}>
  //     </PortfolioBuildingDetailsContainer>)
  // }

  render() {
    let buildingByType = this.groupBuildingsByType();
    return (
    <div>
      <h2>Portfolio</h2>
      <hr />
      <div className="building__container">
        {Object.keys(buildingByType).map(typeId => {
          return (<PortfolioBuildingDetailsContainer buildings={buildingByType[typeId]} 
                                                     buildingTypeId={typeId} 
                                                     match={this.props.match}>
                  </PortfolioBuildingDetailsContainer>)
        })}
      </div>
    </div>);
  }
}

function mapStateToProps(state, ownProps) {
  return {
    buildings: getBuildingsByPortfolio(ownProps.match.params.pId, state), 
    // buildingTypes: getBuildingTypesByPortfolio(ownProps.match.params.pId, state)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    buildingActions: bindActionCreators(BuildingActions, dispatch),
    initActions: bindActionCreators({ loadInitialState }, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PortfolioContainer);


/*{this.props.buildings.map(building => {
  return (<div className="building__row" key={building.id}>
      <div className="building__details">
        <h3>{building.name}</h3>
        <p>{building.address}</p>
      </div>
      <div>
        status
      </div>
      <div>
        building type
      </div>
      <span className="building__link">
        <a href={`download/${this.props.match.params.pId}`}>Download as CSV</a>
        <Link to={`/buildings/${building.id}`}>Details</Link>
      </span>
  </div>)
})}*/