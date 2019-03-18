import React from 'react';

import * as BuildingActions from '../actions/buildings';
import { loadInitialState } from '../actions/initialState';
import { getBuildingTypeNameById } from '../selectors/buildingTypesSelector';
import { progressForBuildingsArray } from '../selectors/answersSelector';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { throws } from 'assert';


class PortfolioBuildingDetailsContainer extends React.Component {
  getStatusForBuilding(index) {
    if (this.props.buildingStatusArray[index] == 1) {
      return "Completed"
    } else if (this.props.buildingStatusArray[index] == 0) {
      return "Not Started"
    }
    return "In Progress"
  }
  render() {
    return (<div>
      <h3>{this.props.buildingTypeName}</h3>
      <div className="building__container">
        <div className="building__row">
            <div className="building__details">
              <h3>Name</h3>
            </div>
            <div>
              <h3>Status</h3>
            </div>
            <div>
              <h3>Building Type</h3>
            </div>
            <div>
              <h3>Actions</h3>
            </div>
        </div>
      {this.props.buildings.map((building, index) => {
        return (<div className="building__row" key={building.id}>
            <div className="building__details">
              <h3>{building.name}</h3>
              <p>{building.address}</p>
            </div>
            <div>
              {this.getStatusForBuilding(index)}
            </div>
            <div>
              {this.props.buildingTypeName}
            </div>
            <span className="building__link">
              <a href={`download/${this.props.match.params.pId}`}>Download as CSV</a>
              <Link to={`/buildings/${building.id}`}>Details</Link>
            </span>
        </div>)
      })}
      </div>
    </div>);
  }
}

PortfolioBuildingDetailsContainer.propTypes = {
    buildings: PropTypes.array.isRequired,
    buildingTypeId: PropTypes.string.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    buildingTypeName: getBuildingTypeNameById(ownProps.buildingTypeId, state),
    buildingStatusArray: progressForBuildingsArray(ownProps.buildings, state)
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
)(PortfolioBuildingDetailsContainer);
