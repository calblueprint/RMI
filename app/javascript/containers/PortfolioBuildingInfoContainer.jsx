import React from "react";
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { getNameByBuildingId } from "../selectors/buildingsSelector";
import CategoryContainer from './CategoryContainer';
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

  getDotStatusForBuilding() {
    if (this.props.buildingStatus == 1) {
      return "green"
    } else if (this.props.buildingStatus > 0) {
      return "yellow"
    }
  }

  mapCategorytoContainer() {
    let categoriesData = this.props.categoriesData;  
    let pId = this.props.portfolioId;  
    return Object.keys(categoriesData).map((id) => {
      return (<CategoryContainer portfolioId={pId} id={id} categoryData={categoriesData[id]} key={id}></CategoryContainer>)
    })
  }

  render() {
    let buildingId = this.props.buildingId;

    return (
      <div className='building__details' key={this.props.buildingId}>
        <div className="building_info">
          <div>
            <span className='small_header'>BUILDING</span>
            <h2>{this.props.name}</h2>
            <span className={'dot ' + this.getDotStatusForBuilding()}></span>{this.getStatusForBuilding()}
          </div>
          <div>
            <span className="building__link">
                {/* should be changed to different button */}
                <Link to={`/buildings/${this.props.buildingId}`}>Assign Building</Link>
            </span>
            <a href={`download/${buildingId}`}>Export CSV</a>
          </div>
          </div>
          <br></br>
          <table className='portfolio_category_info'>
          <thead>
            <tr className='cat_names'>
              <th className='small_header'>QUESTIONS</th>
              <th className='small_header'>STATUS</th>
              <th className='small_header'>PEOPLE ASSIGNED</th>
            </tr>
          </thead>
            <tbody>
              {this.mapCategorytoContainer()}
            </tbody>
          </table> 
      </div>
    );
  }
}

PortfolioBuildingInfoContainer.propTypes = {
  portfolioId: PropTypes.number.isRequired,
  buildingId: PropTypes.number.isRequired,
  categoriesData: PropTypes.array.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    name: getNameByBuildingId(ownProps.buildingId, state),
    buildingStatus: percentAnswered(ownProps.buildingId, state),
  };
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PortfolioBuildingInfoContainer);
