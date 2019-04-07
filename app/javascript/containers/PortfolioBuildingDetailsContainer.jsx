import React from 'react';

import { viewBuildingDetails } from '../actions/portfolios';
import { getUserType } from '../selectors/usersSelector'
import { getBuildingTypeNameById } from '../selectors/buildingTypesSelector';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';


class PortfolioBuildingDetailsContainer extends React.Component { 

  isActive(buildingId) {
    if (this.props.selectedBuildingId == buildingId) {
      return "active"
    }
  }

  addBuildingButton() {
    console.log(this.props.userType)
    if (this.props.userType == "RMIadmin") {
      return (<button>+ Add Building</button>)
    }
  }

  render() {
    let portfolioId = this.props.portfolioId;

    return (<div>
      <h3>{this.props.buildingTypeName}</h3>
      <div className="building__names">
      {this.props.buildings.map((building) => {
        return (<div  key={building.id}
                      onClick={() => {this.props.clickAction(portfolioId, building.id)}}
                      className={this.isActive(building.id)}>
                <span className="dot"></span>
                {building.name}
                </div>)
      })}
      {this.addBuildingButton()}
      </div>
    </div>);
  }
}

PortfolioBuildingDetailsContainer.propTypes = {
    portfolioId: PropTypes.string.isRequired,
    buildings: PropTypes.array.isRequired,
    buildingTypeId: PropTypes.string.isRequired,
    selectedBuildingId: PropTypes.string
};

function mapStateToProps(state, ownProps) {
  return {
    buildingTypeName: getBuildingTypeNameById(ownProps.buildingTypeId, state),
    userType: getUserType(state)
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
