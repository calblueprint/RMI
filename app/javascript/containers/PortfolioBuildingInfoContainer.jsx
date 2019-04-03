import React from "react";
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { getNameByBuildingId } from "../selectors/buildingsSelector";
import CategoryContainer from './CategoryContainer';
import { percentAnswered, questionDataPerCategory } from '../selectors/answersSelector';

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
    let categoryData = this.props.categoryData;    

    return (
      <div className="building_details" key={this.props.building_id}>
        <div className="building_info">
          <div>
            BUILDING
            <h2>{this.props.name}</h2>
            {this.getStatusForBuilding()}
            {/* <h3 className='building_address'>{this.props.streetAddress}<br></br>{this.props.cityStateAddress}</h3> */}
          </div>
          <div>
            <span className="building__link">
                <Link to={`/buildings/${this.props.building_id}`}>Assign Building</Link>
            </span>
            <a href={`download/${building_id}`}>Download as CSV</a>
          </div>
          </div>
          <div className="cat_names">
            QUESTIONS
            <span></span>
            STATUS
            <span></span>
            HANDING OFF TO
          </div>
          <br></br>
          <div className='portfolio_category_info'>
            {Object.keys(categoryData).map((id) => {
              return (<CategoryContainer id={id} categoryData={categoryData[id]} key={id}></CategoryContainer>)
            })}
          </div>
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
    // streetAddress: getStreetAddressByBuildingId(ownProps.building_id, state),
    // cityStateAddress: getCityStateAddressByBuildingId(ownProps.building_id, state),
    buildingStatus: percentAnswered(ownProps.building_id, state),
    
    // array containing an object for each category id, name, number of answered questions, and total questions
    categoryData: questionDataPerCategory(ownProps.building_id, state),

  };
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PortfolioBuildingInfoContainer);
