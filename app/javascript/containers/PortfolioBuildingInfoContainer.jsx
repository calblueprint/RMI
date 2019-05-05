import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { addAnswers } from "../actions/answers";

import { percentAnswered } from "../selectors/answersSelector";
import { getNameByBuildingId } from "../selectors/buildingsSelector";

import DelegationPopover from "../components/DelegationPopover";
import CategoryContainer from "./CategoryContainer";

import { delegateBuildingQuestions } from "../utils/DelegationRequests";

import FAIcon from "../components/FAIcon";
import linkIcon from "@fortawesome/fontawesome-free-solid/faExternalLinkAlt";

/** Renders the main information for the building, including the name and
 * the table containing the status of each category */
class PortfolioBuildingInfoContainer extends React.Component {
  isDisabled() {
    return this.props.buildingStatus === 1;
  }

  getStatusForBuilding() {
    if (this.props.buildingStatus == 1) {
      return "Completed";
    } else if (this.props.buildingStatus == 0) {
      return "Not Started";
    }
    return "In Progress";
  }

  getDotStatusForBuilding() {
    if (this.props.buildingStatus == 1) {
      return "green";
    } else if (this.props.buildingStatus > 0) {
      return "yellow";
    }
  }

  mapCategorytoContainer() {
    let categoriesData = this.props.categoriesData;
    let pId = this.props.portfolioId;
    return Object.keys(categoriesData).map(id => {
      return (
        <CategoryContainer
          portfolioId={pId}
          categoryId={id}
          categoryData={categoriesData[id]}
          key={id}
        />
      );
    });
  }

  render() {
    let buildingId = this.props.buildingId;
    let delegateQuestions = this.props.delegateQuestions;

    return (
      <div className="building__details" key={this.props.buildingId}>
        <div className="building_info">
          <div>
            <span className="small_header">BUILDING</span>
            <h2>
              <Link to={`/buildings/${this.props.buildingId}/`}>
                {this.props.name + " "}
                <FAIcon
                  iconObj={linkIcon}
                  style={{ position: "relative", top: "-3px" }}
                />
              </Link>
            </h2>
            <span className={"dot " + this.getDotStatusForBuilding()} />
            {this.getStatusForBuilding()}
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <DelegationPopover
              label="Assign Building"
              onSelectedContact={contact =>
                delegateQuestions(contact, this.props.addAnswers)
              }
              disabled={this.isDisabled()}
            />
            <button
              style={{ marginLeft: "10px" }}
              className="btn btn--neutral"
              href={`download/${buildingId}`}
            >
              Export CSV
            </button>
          </div>
        </div>
        <br />
        <table className="portfolio_category_info">
          <thead>
            <tr className="cat_names">
              <th className="small_header">QUESTIONS</th>
              <th className="small_header">STATUS</th>
              <th className="small_header">PEOPLE ASSIGNED</th>
            </tr>
          </thead>
          <tbody>{this.mapCategorytoContainer()}</tbody>
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
    delegateQuestions: (userDetails, addAnswers) =>
      delegateBuildingQuestions(
        ownProps.buildingId,
        userDetails,
        state,
        addAnswers
      )
  };
}

function mapDispatchToProps(dispatch) {
  return {
    addAnswers: (answers, buildingId) => {
      dispatch(addAnswers(answers, buildingId));
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PortfolioBuildingInfoContainer);
