import React from "react";
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { getStreetAddressByBuildingId, getCityStateAddressByBuildingId, getNameByBuildingId } from "../selectors/buildingsSelector";
import { getCategoriesForBuilding } from '../selectors/categoriesSelector';
import PortfolioBuildingCategoryContainer from './PortfolioBuildingCategoryContainer';
import { percentAnswered } from '../selectors/answersSelector';

class PortfolioBuildingInfoContainer extends React.Component {
  getStatusForBuilding() {
    if (this.props.buildingStatus == 1) {
      return "Completed"
    } else if (this.props.buildingStatus == 0) {
      return "Not Started"
    }
    return "In Progress"
  }

  render() {
    let building_id = this.props.building_id;

    return (
      <div key={this.props.building_id}>
          BUILDING
          <h2 className='building_title'>{this.props.name}</h2>
          <div>
              {this.getStatusForBuilding()}
          </div>
          {/* <h3 className='building_address'>{this.props.streetAddress}<br></br>{this.props.cityStateAddress}</h3> */}
          <span className="building__link">
              <Link to={`/buildings/${this.props.building_id}`}>Details</Link>
          </span>
          <PortfolioBuildingCategoryContainer building_id={ building_id } categories={ this.props.categories }></PortfolioBuildingCategoryContainer>
      </div>
    );
  }
}

PortfolioBuildingInfoContainer.propTypes = {
  building_id: PropTypes.number.isRequired,
};

function mapStateToProps(state, ownProps) {
  return {
    name: getNameByBuildingId(ownProps.building_id, state),
    streetAddress: getStreetAddressByBuildingId(ownProps.building_id, state),
    cityStateAddress: getCityStateAddressByBuildingId(ownProps.building_id, state),
    categories: getCategoriesForBuilding(ownProps.building_id, state),
    buildingStatus: percentAnswered(ownProps.building_id, state)
  };
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PortfolioBuildingInfoContainer);
