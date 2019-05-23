import React from "react";

import { setActiveBuilding } from "../actions/portfolios";
import { getPercentAnsweredForBuildingGroup } from "../selectors/answersSelector";
import { getBuildingTypeNameById } from "../selectors/buildingTypesSelector";
import { connect } from "react-redux";
import PropTypes from "prop-types";

/** Portfolio View sidebar- this renders a list of building names
 * which can be clicked to display more information */
class PortfolioBuildingDetailsContainer extends React.Component {
  isActive(buildingId) {
    if (this.props.selectedBuildingId == buildingId) {
      return "sidebar-category-row-selected";
    }
  }

  getDotStatus(bId) {
    const percentAnswered = this.props.percentAnswered[bId];
    if (percentAnswered === 1) {
      return "green";
    } else if (percentAnswered > 0) {
      return "yellow";
    }
  }

  render() {
    let portfolioId = this.props.portfolioId;

    return (
      <div>
        <h3>{this.props.buildingTypeName}</h3>
        <div className="building__names">
          {this.props.buildings.map(building => {
            return (
              <div
                key={building.id}
                onClick={() => {
                  this.props.setActiveBuilding(portfolioId, building.id);
                }}
                className={`${this.isActive(building.id)} sidebar-category-row`}
              >
                <span className={"dot " + this.getDotStatus(building.id)} />
                {building.name}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

PortfolioBuildingDetailsContainer.propTypes = {
  portfolioId: PropTypes.string.isRequired,
  buildings: PropTypes.array.isRequired,
  buildingTypeId: PropTypes.string.isRequired,
  selectedBuildingId: PropTypes.number
};

function mapStateToProps(state, ownProps) {
  return {
    buildingTypeName: getBuildingTypeNameById(ownProps.buildingTypeId, state),
    // dictionary with building id as the keys and the percent of answered questions as the value
    percentAnswered: getPercentAnsweredForBuildingGroup(
      ownProps.buildings,
      state
    )
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setActiveBuilding: (portfolioId, buildingId) => {
      dispatch(setActiveBuilding(portfolioId, buildingId));
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PortfolioBuildingDetailsContainer);
