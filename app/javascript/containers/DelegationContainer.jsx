import React from "react";

import DelegationContactCard from "../components/DelegationContactCard";
import DelegationPopover from "../components/DelegationPopover";
import QuestionContainer from "./QuestionContainer";

import * as ContactActions from "../actions/contacts";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { getDependentQuestionsForOptionIds } from "../selectors/questionsSelector";
import {
  getAnswerForQuestionAndBuilding,
  isValidAnswer,
  isDelegatedAnswer
} from "../selectors/answersSelector";
import { createAnswer, updateAnswer } from "../actions/answers";

import validateEmail from "../utils/validateEmail";

class DelegationContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      finished:
        this.props.answer && validateEmail(this.props.answer.delegation_email),
      selected: false
    };
  }

  toggleSelected = () => {
    this.setState(state => {
      selected: !state.selected;
    });
  };

  updateAnswer = ({ email, firstName, lastName }) => {
    // Need to keep answers up to date as during editing
    const answer = {
      building_id: this.props.building_id,
      question_id: this.props.question_id,
      delegation_email: email,
      delegation_first_name: firstName,
      delegation_last_name: lastName
    };

    if (!this.props.answer) {
      this.props.createAnswer(answer.building_id, answer);
    } else {
      answer.id = this.props.answer.id;
      this.props.updateAnswer(answer.building_id, answer);
    }
  };

  clearContact = () => {
    this.updateAnswer({ email: "", firstName: "", lastName: "" });
    this.setState({
      finished: false
    });
  };

  renderAnswered() {
    const dependents = this.props.dependentQuestions[
      this.props.answer.selected_option_id
    ];
    if (!dependents) return null;

    return (
      <div>
        {dependents.map(question => (
          <div key={`delegate_${question.id}`}>
            <QuestionContainer
              mode={this.props.mode}
              building_id={this.props.building_id}
              {...question}
            />
          </div>
        ))}
      </div>
    );
  }

  render() {
    if (
      isValidAnswer(this.props.answer) &&
      !isDelegatedAnswer(this.props.answer) &&
      this.props.mode === "delegation"
    ) {
      return this.renderAnswered();
    }

    let delegationBlock;
    if (this.state.finished) {
      delegationBlock = (
        <DelegationContactCard
          firstName={this.props.answer.delegation_first_name}
          lastName={this.props.answer.delegation_last_name}
          email={this.props.answer.delegation_email}
          handleClickChangeContact={() => {
            this.clearContact();
          }}
          handleClickRemoveContact={() => {
            this.clearContact();
            this.props.onDelegationRemove();
          }}
          showRemoveContactBtn={this.props.mode !== "delegation"}
        />
      );
    } else {
      delegationBlock = (
        <div>
          <p className="delegation__label">Handoff</p>
          <DelegationPopover
            onOpen={this.clearContact}
            onSelectedContact={contact => {
              this.setState({ finished: true });
              this.updateAnswer(contact);
            }}
          />
          <button
            className="btn btn--secondary delegation__edit_btn"
            onClick={this.props.onDelegationCancel}
          >
            Answer Question
          </button>
        </div>
      );
    }

    return (
      <div className="question__block">
        <div
          className={`question ${
            this.state.selected ? "question--selected" : ""
          }`}
        >
          <p>{this.props.text}</p>
          <div className="delegation__block">{delegationBlock}</div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    answer: getAnswerForQuestionAndBuilding(
      ownProps.question_id,
      ownProps.building_id,
      state
    ),
    dependentQuestions: getDependentQuestionsForOptionIds(
      Object.keys(ownProps.options),
      ownProps.question_type,
      state
    )
  };
}

function mapDispatchToProps(dispatch) {
  return {
    contactActions: bindActionCreators(ContactActions, dispatch),
    createAnswer: function(buildingId, answer) {
      return createAnswer(buildingId, answer, dispatch);
    },
    updateAnswer: function(buildingId, answer) {
      return updateAnswer(buildingId, answer, dispatch);
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DelegationContainer);
