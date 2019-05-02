import React from "react";
import PropTypes from "prop-types";
import PortfolioBuildingInfoContainer from "./PortfolioBuildingInfoContainer";
import CategoryDetailsContainer from "./CategoryDetailsContainer";
import { get } from "../fetch/requester";
import { connect } from "react-redux";
import { questionDataPerCategory } from "../selectors/answersSelector";

/* Renders the two main containers for the portfolio view according to the selected building
and selected category and handles the GET request for the login times needed to see the last time
another user was active.
*/
class PortfolioBuildingContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loginUserData: null };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.selectedBuildingId !== this.props.selectedBuildingId) {
      this.getLoginUserData();
    }
  }

  async getLoginUserData() {
    let building_id = this.props.selectedBuildingId;
    try {
      let response = await get(
        "/api/buildings/" + building_id + "/get_user_data"
      );
      this.setState({ loginUserData: response.data });
      return response.data;
    } catch (error) {
      return {};
    }
  }

  showSelectedBuilding(selectedBuildingId) {
    let buildings = this.props.buildings;
    let pId = this.props.portfolio_id;
    let categoriesData = this.props.categoriesData;

    return buildings.map(b => {
      if (b.id === selectedBuildingId) {
        return (
          <PortfolioBuildingInfoContainer
            key={b.id}
            buildingId={b.id}
            portfolioId={pId}
            categoriesData={categoriesData}
          />
        );
      }
    });
  }

  showSelectedCategory(selectedBuildingId, selectedCategoryId) {
    let buildings = this.props.buildings;
    let pId = this.props.portfolio_id;
    let categoriesData = this.props.categoriesData;
    return buildings.map(b => {
      if (b.id === selectedBuildingId && selectedCategoryId) {
        return (
          <CategoryDetailsContainer
            loginUserData={this.state.loginUserData}
            categoryData={categoriesData[selectedCategoryId]}
            key={b.id}
            buildingId={b.id}
            buildingName={b.name}
            portfolioId={pId.id}
            categoryId={selectedCategoryId}
          />
        );
      }
    });
  }

  render() {
    let selectedBuildingId = this.props.selectedBuildingId;
    let selectedCategoryId = this.props.selectedCategoryId;

    return (
      <div className="portfolio_building_container">
        <div>{this.showSelectedBuilding(selectedBuildingId)}</div>
        <div className="building_category_details">
          {this.showSelectedCategory(selectedBuildingId, selectedCategoryId)}
        </div>
      </div>
    );
  }
}

PortfolioBuildingContainer.propTypes = {
  portfolio_id: PropTypes.string.isRequired,
  buildings: PropTypes.array.isRequired,
  selectedBuildingId: PropTypes.string,
  selectedCategoryId: PropTypes.string
};

function mapStateToProps(state, ownProps) {
  return {
    // array containing an object for each category id, name, number of answered questions, and total questions
    categoriesData: questionDataPerCategory(ownProps.selectedBuildingId, state)
  };
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PortfolioBuildingContainer);
