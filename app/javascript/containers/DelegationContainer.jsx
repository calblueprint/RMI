import React from "react";

import DelegationNameInputs from "../components/DelegationNameInputs";
import DelegationContactSelector from "../components/DelegationContactSelector";
import DelegationContactCard from "../components/DelegationContactCard";
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
import { getContacts } from "../selectors/contactsSelector";
import { createAnswer, updateAnswer } from "../actions/answers";

import validateEmail from "../utils/validateEmail";

class DelegationContainer extends React.Component {
  constructor(props) {
    super(props);
    if (this.props.answer) {
      this.state = {
        email: this.props.answer.delegation_email,
        firstName: this.props.answer.delegation_first_name,
        lastName: this.props.answer.delegation_last_name,
        showNameInputs: false,
        finished: validateEmail(this.props.answer.delegation_email),
        selected: false
      };
    } else {
      this.state = {
        email: "",
        firstName: "",
        lastName: "",
        showNameInputs: false,
        finished: false,
        selected: false
      };
    }
  }

  componentDidMount() {
    this.createOrUpdateContactsIfValid(null);
  }

  showNameInputs = () => {
    this.setState({ showNameInputs: true });
  };

  toggleSelected = () => {
    this.setState(state => {
      selected: !state.selected;
    });
  };

  updateAnswer() {
    // Need to keep answers up to date as during editing
    const answer = {
      building_id: this.props.building_id,
      question_id: this.props.question_id,
      delegation_email: this.state.email,
      delegation_first_name: this.state.firstName,
      delegation_last_name: this.state.lastName
    };

    if (!this.props.answer) {
      this.props.createAnswer(answer.building_id, answer);
    } else {
      answer.id = this.props.answer.id;
      this.props.updateAnswer(answer.building_id, answer);
    }
  }

  clearContact() {
    this.setState(
      {
        email: "",
        firstName: "",
        lastName: "",
        showNameInputs: false,
        finished: false
      },
      this.updateAnswer
    );
  }

  saveContact = () => {
    this.setState({ finished: true }, () => {
      this.updateAnswer();
      this.createOrUpdateContactsIfValid(null);
    });
  };

  selectContactByEmail = email => {
    const contact = this.props.contacts.find(
      contact => contact.email === email
    );
    if (!contact) {
      return;
    }
    this.setState(
      {
        email,
        firstName: contact.first_name,
        lastName: contact.last_name,
        finished: true
      },
      this.updateAnswer
    );
  };

  handleContactInfoChange = (key, value) => {
    this.setState({ [key]: value });
  };

  // If email, firstname and lastname are valid pair, then
  // this function should be called to update contacts stored
  // in redux, and make it available in future references
  createOrUpdateContactsIfValid(oldState) {
    if (oldState && validateEmail(oldState.email)) {
      this.props.contactActions.deleteContact(oldState.email);
    }
    if (
      validateEmail(this.state.email) &&
      this.state.firstName &&
      this.state.lastName
    ) {
      this.props.contactActions.addContact(
        this.state.email,
        this.state.firstName,
        this.state.lastName
      );
    }
  }

  filterContacts() {
    if (this.state.email) {
      const query = this.state.email.toLowerCase();
      return this.props.contacts.filter(
        contact =>
          contact.email.toLowerCase().includes(query) ||
          contact.first_name.toLowerCase().includes(query) ||
          contact.last_name.toLowerCase().includes(query)
      );
    } else {
      return this.props.contacts;
    }
  }

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
          firstName={this.state.firstName}
          lastName={this.state.lastName}
          email={this.state.email}
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
    } else if (this.state.showNameInputs) {
      delegationBlock = (
        <DelegationNameInputs
          handleContactInfoChange={this.handleContactInfoChange}
          handleClickSaveContact={this.saveContact}
        />
      );
    } else {
      delegationBlock = (
        <DelegationContactSelector
          handleClickCreateContact={this.showNameInputs}
          handleContactInfoChange={this.handleContactInfoChange}
          handleExistingContactSelect={this.selectContactByEmail}
          handleDelegationCancel={this.props.onDelegationCancel}
          toggleSelected={this.toggleSelected}
          contacts={Object.values(this.filterContacts())}
          email={this.state.email}
        />
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
    ),
    contacts: getContacts(state)
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
