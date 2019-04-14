import React from "react";
import ReactModal from "react-modal";

import * as BuildingActions from "../actions/buildings";
import { loadInitialState } from "../actions/initialState";
import { getBuildingsByPortfolio } from "../selectors/buildingsSelector";
import { getAnswerForQuestionAndBuilding } from "../selectors/answersSelector";
import {
  createAnswer,
  updateAnswer,
  addAnswers,
  EMPTY_ANSWER,
  DELETE_LOCAL_ANSWER
} from "../actions/answers";
import Modal from "../components/Modal.jsx";
import { getBuildingTypes } from "../selectors/buildingTypesSelector";
import { addBuilding } from "../actions/buildings";
import { post, patch } from "../fetch/requester";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class PortfolioContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      errors: null
    };
    this.createBuilding = this.createBuilding.bind(this);
    this.createAnswers = this.createAnswers.bind(this);
    this.delegateQuestions = this.delegateQuestions.bind(this);
    this.updateAnswers = this.updateAnswers.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
  }

  toggleModal() {
    this.setState({ showModal: !this.state.showModal });
  }

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
        this.delegateQuestions(
          newAnswers,
          buildingId,
          email,
          firstName,
          lastName
        );
      }
    } catch (error) {}
  }
  async delegateQuestions(answers, buildingId, email, firstName, lastName) {
    let delegations = [];
    for (const answer of Object.values(answers)) {
      let delegation = {
        email: email,
        first_name: firstName,
        last_name: lastName,
        answer_id: answer.id
      };
      delegations.push(delegation);
    }
    try {
      let response = await post("/api/delegations", { delegations });
      const answersToUpdate = response.data;
      Object.values(answersToUpdate).forEach(a => {
        a.delegation_email = email;
        a.delegation_first_name = firstName;
        a.delegation_last_name = lastName;
        answersToUpdate[a.question_id] = a;
      });
      this.updateAnswers(Object.values(answersToUpdate), buildingId);
    } catch (error) {}
  }
  async updateAnswers(answers, buildingId) {
    try {
      let response = await patch("/api/answers/update_multiple", {
        answers: answers,
        answer: {}
      });
      const updatedAnswers = response.data;
      this.props.addAnswers(updatedAnswers, buildingId);
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
      this.createAnswers(questions, buildingId, email, firstName, lastName);
      this.props.history.push(`/buildings/${buildingId}`);
    } catch (error) {
      this.setState({ errors: error, showModal: true });
    }
  }

  render() {
    return (
      <div>
        <h2>Portfolio</h2>
        <a href={`download/${this.props.match.params.pId}`}>Download as CSV</a>
        <hr />
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
        <div className="building__container">
          {this.props.buildings.map(building => {
            return (
              <div className="building__row" key={building.id}>
                <div className="building__details">
                  <h3>{building.name}</h3>
                  <p>{building.address}</p>
                </div>
                <span className="building__link">
                  <Link to={`/buildings/${building.id}`}>Details</Link>
                </span>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    buildings: getBuildingsByPortfolio(ownProps.match.params.pId, state),
    building_types: getBuildingTypes(state),
    getAnswer: (questionId, buildingId) =>
      getAnswerForQuestionAndBuilding(questionId, buildingId, state)
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
