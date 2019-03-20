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
  
  render() {
    let buildingByType = this.groupBuildingsByType();
    return (
    <div>
      <h2>Portfolio</h2>
      <br />
      <a href={`download/${this.props.match.params.pId}`}>Download as CSV</a>
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

