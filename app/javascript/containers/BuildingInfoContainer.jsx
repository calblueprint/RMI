import React from "react";
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { getStreetAddressByBuildingId, getCityStateAddressByBuildingId, getNameByBuildingId } from "../selectors/buildingsSelector";
import { getCategoriesForBuilding } from '../selectors/categoriesSelector';
import QuestionaireCategoryContainer from './QuestionaireCategoryContainer';

class BuildingInfoContainer extends React.Component {
  render() {
    return (
      <div key={this.props.building_id}>
          <h2 className='building_title'>{this.props.name}</h2>
          <h3 className='building_address'>{this.props.streetAddress}<br></br>{this.props.cityStateAddress}</h3>
          <QuestionaireCategoryContainer building_id={ this.props.building_id } categories={ this.props.categories }></QuestionaireCategoryContainer>
      </div>
    );
  }
}

BuildingInfoContainer.propTypes = {
  building_id: PropTypes.string.isRequired,
};

function mapStateToProps(state, ownProps) {
  return {
    name: getNameByBuildingId(ownProps.building_id, state),
    streetAddress: getStreetAddressByBuildingId(ownProps.building_id, state),
    cityStateAddress: getCityStateAddressByBuildingId(ownProps.building_id, state),
    categories: getCategoriesForBuilding(ownProps.building_id, state),
  };
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BuildingInfoContainer);
