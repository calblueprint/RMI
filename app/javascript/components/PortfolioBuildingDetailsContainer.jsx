import React from 'react';

import { viewBuildingDetails } from '../actions/portfolios';
import * as BuildingActions from '../actions/buildings';
import { loadInitialState } from '../actions/initialState';
import { getBuildingTypeNameById } from '../selectors/buildingTypesSelector';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';


class PortfolioBuildingDetailsContainer extends React.Component { 
  render() {
    let portfolioId = this.props.portfolioId

    return (<div>
      <h3>{this.props.buildingTypeName}</h3>
      <div className="building__names">
      {this.props.buildings.map((building) => {
        return (<div  className="building__row" 
                      key={building.id}
                      onClick={() => {this.props.clickAction(portfolioId, building.id)}}>
            <div className="building__details">
              <h3>{building.name}</h3>
            </div>
        </div>)
      })}
      </div>
    </div>);
  }
}

PortfolioBuildingDetailsContainer.propTypes = {
    portfolioId: PropTypes.string.isRequired,
    buildings: PropTypes.array.isRequired,
    buildingTypeId: PropTypes.string.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    buildingTypeName: getBuildingTypeNameById(ownProps.buildingTypeId, state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    clickAction: (portfolioId, buildingId) => {
      dispatch(viewBuildingDetails(portfolioId, buildingId));
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PortfolioBuildingDetailsContainer);
