import React from "react";

import * as BuildingActions from "../actions/buildings";
import { loadInitialState } from "../actions/initialState";
import { getBuildingsByPortfolio } from "../selectors/buildingsSelector";
import {
  getPortfolioName,
  getSelectedBuildingId,
  getSelectedCategoryId,
  getBuildingStatusesByPortfolio
} from "../selectors/portfolioSelector";
import { getAnswerForQuestionAndBuilding } from "../selectors/answersSelector";
import {
  addAnswers,
  EMPTY_ANSWER,
  DELETE_LOCAL_ANSWER
} from "../actions/answers";
import Modal from "../components/Modal.jsx";
import { getBuildingTypes } from "../selectors/buildingTypesSelector";
import { addBuilding } from "../actions/buildings";
import { post } from "../fetch/requester";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { delegateQuestions } from "../utils/DelegationRequests";

import PortfolioBuildingDetailsContainer from "./PortfolioBuildingDetailsContainer";
import PortfolioBuildingInfoContainer from "./PortfolioBuildingInfoContainer";
import CategoryDetailsContainer from "./CategoryDetailsContainer";
import Logo from "../images/rmi-logo.png";

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
    const buildingTypeId = document.getElementById("building").value;
    const address = event.target.address.value;
    const city = event.target.city.value;
    const state = document.getElementById("state").value;
    const zip = event.target.zip.value;
    const firstName = event.target.first.value;
    const lastName = event.target.last.value;
    const questions = Object.values(
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
        questions: questions
      };
      const buildingId = building.id;
      this.props.addBuilding(building);
      await this.createAnswers(
        questions,
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

  showSelectedBuilding(selectedBuildingId) {
    let buildings = this.props.buildings;
    let pId = this.props.match.params.pId;

    for (let i = 0; i < buildings.length; i++) {
      let b = buildings[i];
      if (b.id === selectedBuildingId) {
        return (
          <PortfolioBuildingInfoContainer
            key={b.id}
            building_id={b.id}
            portfolio_id={pId}
          />
        );
      }
    }
  }

  showSelectedCategory(selectedBuildingId, selectedCategoryId) {
    let buildings = this.props.buildings;
    let pId = this.props.match.params.pId;

    for (let i = 0; i < buildings.length; i++) {
      let b = buildings[i];
      if (b.id === selectedBuildingId && selectedCategoryId) {
        return (
          <CategoryDetailsContainer
            key={b.id}
            building_id={b.id}
            portfolio_id={pId}
            category_id={selectedCategoryId}
          />
        );
      }
    }
  }

  render() {
    let buildingByType = this.groupBuildingsByType();
    let portfolioId = this.props.match.params.pId;
    let selectedBuildingId = this.props.selectedBuildingId;
    let selectedCategoryId = this.props.selectedCategoryId;

    return (
      <div className="portfolio__container">
        <div className="portfolio__header">
          <div>
            <Link to="/">
              <img src={Logo} draggable={false} />
            </Link>
          </div>
          <div>
            <span className="small_header">PORTFOLIO</span>
            <h2>{this.props.portfolioName}</h2>
          </div>
          <input
            type="button"
            value="Create New Building"
            onClick={this.toggleModal}
          />
          <Modal
            {...this.props}
            showModal={this.state.showModal}
            errors={this.state.errors}
            toggleModal={this.toggleModal}
            createBuilding={this.createBuilding}
          />
        </div>
        <div className="building__container">
          <div className="building__types">
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
          <div className="building__details">
            {this.showSelectedBuilding(selectedBuildingId)}
          </div>
        </div>
        <div className="building_category_details">
          {this.showSelectedCategory(selectedBuildingId, selectedCategoryId)}
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
    getAnswer: (questionId, buildingId) =>
      getAnswerForQuestionAndBuilding(questionId, buildingId, state),
    selectedBuildingId: getSelectedBuildingId(ownProps.match.params.pId, state),
    selectedCategoryId: getSelectedCategoryId(ownProps.match.params.pId, state)
    // buildingStatuses: getBuildingStatusesByPortfolio(ownProps.match.params.pId, state)
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
