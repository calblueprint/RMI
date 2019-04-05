import React from "react";
import ReactModal from "react-modal";

import * as BuildingActions from "../actions/buildings";
import { loadInitialState } from "../actions/initialState";
import { getBuildingsByPortfolio } from "../selectors/buildingsSelector";
import { getAnswerForQuestionAndBuilding } from "../selectors/answersSelector";
import { createAnswer, updateAnswer, addAnswers, addDelegations } from "../actions/answers";
import { getBuildingTypes } from "../selectors/buildingTypesSelector";
import { addBuilding } from "../actions/buildings";
import { post, patch } from "../fetch/requester";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

async function postDelegations(delegations) {
  var body = { delegations };

  try {
    let resp = await post("/api/delegations", body);
    return true;
  } catch (error) {
    return false;
  }
}

class PortfolioContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      errors: null
    };
    this.toggleModal = this.toggleModal.bind(this);
    this.createBuilding = this.createBuilding.bind(this);
    this.createAnswers = this.createAnswers.bind(this);
    this.delegateQuestions = this.delegateQuestions.bind(this);
    this.updateAnswers = this.updateAnswers.bind(this);
    // this.addDelegations = this.addDelegations.bind(this);
  }

  toggleModal() {
    this.setState({ showModal: !this.state.showModal });
  }

  async createAnswers(questions, buildingId, email, firstName, lastName) {
    var answers = [];
    for (var i = 0; i < questions.length; i++) {
      var emptyAnswer = {
        text: "",
        building_id: buildingId,
        question_id: questions[i],
        selected_option_id: null,
        attachment_file_name: null,
        attachment_content_type: null,
        attachment_file_size: null,
        attachment_updated_at: null,
        delegation_email: "",
        delegation_first_name: "",
        delegation_last_name: ""
      };
      answers.push(emptyAnswer);
      // console.log(answers)
      // console.log('huh')
    }
    try {
      console.log(answers)
      console.log('b4 api answers')
      let response = await post("/api/answers/create_multiple", { answers: answers, answer: {} });
      // console.log("created answers");
      //after building is created, we should have tons of empty answers
      console.log(response)
      const newAnswers = response.data
      console.log(newAnswers)
      // here need to adjust indices such that the index of the answer matches the questionId
      //for each item, map questionId: the object itself
      const formattedAnswers = {}
      newAnswers.forEach(function(a) {
        formattedAnswers[a.question_id] = a
      })
      console.log(formattedAnswers)
      console.log(newAnswers)
      //update redux store with empty answers
      this.props.addAnswers(formattedAnswers, buildingId)
      this.delegateQuestions(newAnswers, buildingId, email, firstName, lastName, formattedAnswers);
    } catch (error) {
      console.log(error);
    }
  }
  async delegateQuestions(answers, buildingId, email, firstName, lastName, formattedAnswers) {
    //we get the question_ids to be delegated through answers
    console.log('answers here')
    //since answers will now be created the delegations should be okay!
    console.log(answers)
    var delegations = [];
    for (var i = 0; i < answers.length; i++) {
      //for each question, create an answer
      // var currentAnswer = this.props.getAnswer(answers[i].question_id, buildingId);
      // console.log('current answer')
      // console.log(currentAnswer)
      var delegation = {
        email: email,
        first_name: firstName,
        last_name: lastName,
        answer_id: answers[i].id
      };
      delegations.push(delegation);
    }
    // this.setState({ status_string: "Saving delegations!" });
    try {
      console.log('b4 delegation creation')
      let response = await post("/api/delegations", { delegations });
      console.log('delegations succesfully created in backend')
      //update redux store with delegations
      // console.log(formattedAnswers)
      const finalAnswers = response.data;
      Object.values(finalAnswers).forEach(function(a){
        a.delegation_email = email;
        a.delegation_first_name = firstName;
        a.delegation_last_name = lastName;
      })
      console.log(finalAnswers)
      // console.log(copy)
      this.updateAnswers(finalAnswers, buildingId)
    } catch (error) {
      console.log(error);
    }
  }
  async updateAnswers(answers, buildingId) {
    //adding delegations is just updating answers
    try {
      console.log('b4 answer update')
      console.log(answers)
      let response = await patch("/api/answers/update_multiple", { answers: answers, answer: {} });
      console.log('answers succesfully updated in backend')
      console.log(response.data)
      //update redux store with answers
      this.props.addDelegations(answers, buildingId)
    } catch (error) {
      console.log(error);
    }
  }

  async createBuilding(event) {
    event.preventDefault();
    const buildingName = event.target.name.value;
    const email = event.target.email.value;
    const buildingTypeId = document.getElementById("building").value;
    const address = event.target.address.value;
    const city = event.target.city.value;
    const state = event.target.state.value;
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
      console.log("made it here");
      //after building is created, we should have tons of empty answers
      const building = {
        ...response.data,
        answers: {},
        questions: questions
      };
      const buildingId = building.id;
      console.log(building);
      this.props.addBuilding(building);
      this.createAnswers(questions, buildingId, email, firstName, lastName);
      //update redux store with answers to include the email and the names
      this.props.history.push(`/buildings/${buildingId}/edit`);
    } catch (error) {
      console.log(error);
      this.setState({ errors: error, showModal: true });
    }
  }
  // updateAnswer() {
  //   // Need to keep answers up to date as during editing
  //   const answer = {
  //     building_id: this.props.building_id,
  //     question_id: this.props.question_id,
  //     delegation_email: this.state.email,
  //     delegation_first_name: this.state.firstName,
  //     delegation_last_name: this.state.lastName,
  //   };

  //   if (!this.props.answer) {
  //     this.props.createAnswer(answer.building_id, answer);
  //   }
  //   else {
  //     answer.id = this.props.answer.id;
  //     this.props.updateAnswer(answer.building_id, answer);
  //   }
  // }

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
        <ReactModal isOpen={this.state.showModal}>
          <form onSubmit={this.createBuilding}>
            <label>
              Building Name
              <input type="text" name="name" />
            </label>
            <br />
            <label>
              Email Address
              <input type="text" name="email" />
            </label>
            <br />
            <label>
              First Name
              <input type="text" name="first" />
            </label>
            <br />
            <label>
              Last Name
              <input type="text" name="last" />
            </label>
            <br />
            <label>
              Address
              <input type="text" name="address" />
            </label>
            <br />
            <label>
              City
              <input type="text" name="city" />
            </label>
            <br />
            <label>
              State
              <input type="text" name="state" />
            </label>
            <br />
            <label>
              ZIP Code
              <input type="number" name="zip" />
            </label>
            <br />
            Building Type
            <label>
              <select>
                {Object.keys(this.props.building_types).map(building_type => {
                  return (
                    <option type="text" id="building" value={building_type}>
                      {this.props.building_types[building_type].name}
                    </option>
                  );
                })}
              </select>
            </label>
            <input type="submit" value="Submit" />
          </form>

          <div>{this.state.errors}</div>
          <button onClick={this.toggleModal}>Close Modal</button>
        </ReactModal>
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
      getAnswerForQuestionAndBuilding(
        questionId,
        buildingId,
        state
      )
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
    },
    addDelegations: (answers, buildingId) => {
      dispatch(addDelegations(answers, buildingId));
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PortfolioContainer);
