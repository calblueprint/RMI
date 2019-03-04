import React from "react";
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { getAddressByBuildingId, getNameByBuildingId } from "../selectors/buildingsSelector";
import { getCategoriesForBuilding } from '../selectors/categoriesSelector';
import QuestionaireCategoryContainer from './QuestionaireCategoryContainer';

class BuildingInfoContainer extends React.Component {
  render() {
    return (
      <div key={this.props.building_id}>
          <h3>{this.props.name}</h3>
          <h4>{this.props.address}</h4>
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
    address: getAddressByBuildingId(ownProps.building_id, state),
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
