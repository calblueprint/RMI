import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import * as BuildingActions from "../actions/buildings";
import { loadInitialState } from "../actions/initialState";
import { addBuilding } from "../actions/buildings";
import { addAnswers, EMPTY_ANSWER } from "../actions/answers";

import { getBuildingsByPortfolio } from "../selectors/buildingsSelector";
import {
  getPortfolioName,
  getSelectedBuildingId,
  getSelectedCategoryId
} from "../selectors/portfoliosSelector";
import { getBuildingTypes } from "../selectors/buildingTypesSelector";
import { getUserType } from "../selectors/usersSelector";

import Modal from "../components/Modal.jsx";
import PortfolioBuildingDetailsContainer from "./PortfolioBuildingDetailsContainer";
import PortfolioBuildingContainer from "./PortfolioBuildingContainer";

import { post } from "../fetch/requester";
import validateEmail from "../utils/validateEmail";
import { delegateQuestions } from "../utils/DelegationRequests";

class PortfolioContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      errors: null
    };
    this.createBuilding = this.createBuilding.bind(this);
    this.createAnswers = this.createAnswers.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
  }

  groupBuildingsByType() {
    let buildingTypesDic = {};
    let buildings = this.props.buildings;
    for (let i = 0; i < buildings.length; i++) {
      let id = buildings[i].building_type_id;
      if (buildingTypesDic[id] == null) {
        buildingTypesDic[id] = [buildings[i]];
      } else {
        buildingTypesDic[id].push(buildings[i]);
      }
    }
    return buildingTypesDic;
  }

  toggleModal() {
    this.setState({ showModal: !this.state.showModal });
  }

  /**
   * Creates empty answers for each of the given questions.
   * (When we first create a building, we need all answers to exist even if they aren't filled in,
   * so that future delegations can be tied to an answer)
   *
   * If `email` is specified, this will also delegate all the questions to the user
   * with that email address.
   */
  async createAnswers(questions, buildingId, email, firstName, lastName) {
    let answers = [];
    for (let i = 0; i < questions.length; i++) {
      let emptyAnswer = {
        ...EMPTY_ANSWER,
        building_id: buildingId,
        question_id: questions[i]
      };
      answers.push(emptyAnswer);
    }
    try {
      let response = await post("/api/answers/create_multiple", {
        answers: answers,
        answer: {}
      });
      const newAnswers = response.data;
      this.props.addAnswers(newAnswers, buildingId);
      if (email != "") {
        await delegateQuestions(
          newAnswers,
          buildingId,
          email,
          firstName,
          lastName,
          this.props.addAnswers
        );
      }
    } catch (error) {}
  }

  async createBuilding(event) {
    event.preventDefault();
    const buildingName = event.target.name.value;
    const email = event.target.email.value;
    if (!validateEmail(email)) {
      this.setState({ errors: "Email is invalid", showModal: true });
      return;
    }
    const buildingTypeId = document.getElementById("building").value;
    const address = event.target.address.value;
    const city = event.target.city.value;
    const state = document.getElementById("state").value;
    const zip = event.target.zip.value;
    const firstName = event.target.first.value;
    const lastName = event.target.last.value;
    const questionIds = Object.values(
      this.props.building_types[buildingTypeId].questions
    );
    const obj = {
      name: buildingName,
      building_type_id: buildingTypeId,
      address: address,
      city: city,
      state: state,
      zip: zip,
      portfolio_id: this.props.match.params.pId
    };
    try {
      let response = await post("/api/buildings", obj);
      const building = {
        ...response.data,
        answers: {},
        questions: questionIds,

        // editable is used to limit write access on certain questions.
        // Since only admins can create a new building, it's fine to just set all the questions
        //   in the new building to editable for this user.
        editable: questionIds.reduce((map, qId) => {
          map[qId] = true;
          return map;
        }, {})
      };
      const buildingId = building.id;
      this.props.addBuilding(building);
      await this.createAnswers(
        questionIds,
        buildingId,
        email,
        firstName,
        lastName
      );
      this.props.history.push(`/buildings/${buildingId}`);
    } catch (error) {
      this.setState({ errors: error, showModal: true });
    }
  }

  addBuildingButton() {
    if (this.props.userType === "RMIUser") {
      return (
        <button className="btn btn--neutral" onClick={this.toggleModal}>
          + Add Building
        </button>
      );
    }
  }

  render() {
    let buildingByType = this.groupBuildingsByType();
    let portfolioId = this.props.match.params.pId;
    let selectedBuildingId = this.props.selectedBuildingId;
    let selectedCategoryId = this.props.selectedCategoryId;
    let buildings = this.props.buildings;

    return (
      <div className="portfolio__container">
        <Modal
          {...this.props}
          showModal={this.state.showModal}
          errors={this.state.errors}
          toggleModal={this.toggleModal}
          createBuilding={this.createBuilding}
        />
        <div className="building__container">
          <div className="building__types">
            <div>
              <span className="small_header">PORTFOLIO</span>
              <h2>{this.props.portfolioName}</h2>
              {this.addBuildingButton()}
            </div>
            {Object.keys(buildingByType).map((typeId, i) => {
              return (
                <PortfolioBuildingDetailsContainer
                  key={i}
                  portfolioId={portfolioId}
                  buildings={buildingByType[typeId]}
                  buildingTypeId={typeId}
                  match={this.props.match}
                  selectedBuildingId={selectedBuildingId}
                />
              );
            })}
          </div>
          <PortfolioBuildingContainer
            selectedBuildingId={selectedBuildingId}
            selectedCategoryId={selectedCategoryId}
            buildings={buildings}
            portfolio_id={portfolioId}
          />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    portfolioName: getPortfolioName(ownProps.match.params.pId, state),
    buildings: getBuildingsByPortfolio(ownProps.match.params.pId, state),
    building_types: getBuildingTypes(state),
    selectedBuildingId: getSelectedBuildingId(ownProps.match.params.pId, state),
    selectedCategoryId: getSelectedCategoryId(ownProps.match.params.pId, state),
    userType: getUserType(state)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    buildingActions: bindActionCreators(BuildingActions, dispatch),
    initActions: bindActionCreators({ loadInitialState }, dispatch),
    addBuilding: building => {
      dispatch(addBuilding(building));
    },
    addAnswers: (answers, buildingId) => {
      dispatch(addAnswers(answers, buildingId));
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PortfolioContainer);
