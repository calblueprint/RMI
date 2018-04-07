import React from 'react';

import QuestionContainer from './QuestionContainer';

import * as ContactActions from '../actions/contacts';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getDependentQuestionsForOptionIds } from "../selectors/questionsSelector";
import { getAnswerForQuestionAndBuilding } from "../selectors/answersSelector";
import { getContacts } from "../selectors/contactsSelector";
import { createAnswer, updateAnswer } from '../actions/answers';

function validateEmail(elementValue){
  var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return emailPattern.test(elementValue);
}

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
      };
    } else {
      this.state = {
        email: "",
        firstName: "",
        lastName: "",
        showNameInputs: false,
        finished: false,
      };
    }
  }

  componentDidMount() {
    this.createOrUpdateContactsIfValid(null);
  }

  // determine whether answers are available
  answerValid() {
    if (this.props.answer) {
      return this.props.answer.text || this.props.answer.attachment_file_name;
    } else {
      return false;
    }
  }

  handleClickCreateContact() {
    this.setState({ showNameInputs: true });
  }

  handleClickSaveContact() {
    this.setState({ finished: true }, (() => {
      this.updateAnswer();
      this.createOrUpdateContactsIfValid(null);
    }));
  }

  handleExistingContactSelect(value) {
    const contact = this.props.contacts.find(
        (contact) => (contact.email == value));
    if (!contact) {
      return;
    }
    this.setState({
      email: value[0],
      firstName: contact.first_name,
      lastName: contact.last_name,
      finished: true,
    }, this.updateAnswer);
  }

  handleContactInfoChange(key, value) {
    this.setState({ [key]: value });
  }

  // If email, firstname and lastname are valid pair, then
  // this function should be called to update contacts stored
  // in redux, and make it available in future references
  createOrUpdateContactsIfValid(oldState) {
    if (oldState && validateEmail(oldState.email)) {
      this.props.contactActions.deleteContact(oldState.email);
    }
    if (validateEmail(this.state.email) &&
        this.state.firstName && this.state.lastName) {
      this.props.contactActions.addContact(
          this.state.email, this.state.firstName, this.state.lastName);
    }
  }

  updateAnswer() {
    // Need to keep answers up to date as during editing
    const answer = {
      building_id: this.props.building_id,
      question_id: this.props.question_id,
      delegation_email: this.state.email,
      delegation_first_name: this.state.firstName,
      delegation_last_name: this.state.lastName,
    };

    if (!this.props.answer) {
      this.props.createAnswer(answer.building_id, answer);
    }
    else {
      answer.id = this.props.answer.id;
      this.props.updateAnswer(answer.building_id, answer);
    }
  }

  filterContacts() {
    if (this.state.email) {
      return this.props.contacts.filter(
          contact => contact.email.includes(this.state.email));
    } else {
      return this.props.contacts;
    }
  }

  renderUnanswered() {
    const currentEmail = this.state.email;

    const inputs = this.state.showNameInputs ? this.renderNameInputs() : "";
    const select = !this.state.showNameInputs ? this.renderSelectAndCreateButton() : "";

    return (
    <div>
      <p>{this.props.text}</p>
      Assign to other users:<br></br>

      Email:<br></br>
      <input type="text" value={currentEmail}
        onChange={(e) => this.handleContactInfoChange("email", e.target.value)}
      /><br></br>

      {select}

      {inputs}

    </div>)
  }

  renderCreateContactButton() {
    const hasMatchContact = (this.props.contacts.filter((contact) =>
        contact.email == this.state.email).length == 1);
    if (validateEmail(this.state.email) && !hasMatchContact) {
      const buttonValue = "Create new contact " + this.state.email;
      return (
        <div>
          <button type="submit" value={buttonValue}
            onClick={(e) => this.handleClickCreateContact()}
          >{buttonValue}</button>
        </div>)
    }
  }

  renderSelectAndCreateButton() {
    const currentEmail = this.state.email;

    return (
    <div>
      <select onChange={(e) => this.handleExistingContactSelect([e.target.value])}
              defaultValue={currentEmail}>
        <option value="" key="">New target</option>
        {Object.values(this.filterContacts()).map((contact) => {
          return (<option value={contact.email} key={contact.email}>
              {contact.first_name + " " + contact.last_name + "<" + contact.email + ">"}</option>)
        })}
      </select><br></br>
      {this.renderCreateContactButton()}
    </div>)
  }

  renderNameInputs() {
    const currentFirstName = this.state.firstName;
    const currentLastName = this.state.lastName;
    return (
    <div>
      First name:<br></br>
      <input type="text" value={currentFirstName}
        onChange={(e) => this.handleContactInfoChange("firstName", e.target.value)}
      /><br></br>

      Last name:<br></br>
      <input type="text" value={currentLastName}
        onChange={(e) => this.handleContactInfoChange("lastName", e.target.value)}
      /><br></br>

      <button type="submit" value="Create contact and assign"
        onClick={(e) => this.handleClickSaveContact()}
      >Create contact and assign</button>
    </div>)
  }

  renderAnswered() {
    const dependentQuestions = (() => {
      if (this.props.answer) {
        const dependents = this.props.dependentQuestions[this.props.answer.selected_option_id];
        if (dependents) {
          return dependents.map(question => {
            return (<div key={question.id}>
              <QuestionContainer mode="delegation"
                   building_id={this.props.building_id} {...question} />
            </div>);
          });
        }
      }
    })();

    return (<div>{dependentQuestions}</div>);
  }

  handleClickChangeContact() {
    this.setState({
      email: "",
      firstName: "",
      lastName: "",
      showNameInputs: false,
      finished: false,
    }, this.updateAnswer);
  }

  renderDelegated() {
    const delegated_string = this.state.firstName + " " + this.state.lastName + " " + this.state.email;
    return (
        <div>
          <p>{this.props.text}</p>
          <p>Delegated to {delegated_string}</p>
          <button type="button" value="Change"
            onClick={(e) => this.handleClickChangeContact()}
          >Change</button>
        </div>)
  }

  render() {
    if (this.answerValid()) {
      return this.renderAnswered();
    } else if (this.state.finished) {
      return this.renderDelegated();
    } else {
      return this.renderUnanswered();
    }
  }
}

function mapStateToProps(state, ownProps) {
  return {
    answer: getAnswerForQuestionAndBuilding(ownProps.question_id, ownProps.building_id, state),
    dependentQuestions: getDependentQuestionsForOptionIds(Object.keys(ownProps.options), ownProps.question_type, state),
    contacts: getContacts(state)
  }
}

function mapDispatchToProps(dispatch) {
  return {
    contactActions: bindActionCreators(ContactActions, dispatch),
    createAnswer: function (buildingId, answer) {
      return createAnswer(buildingId, answer, dispatch);
    },
    updateAnswer: function (buildingId, answer) {
      return updateAnswer(buildingId, answer, dispatch);
    }
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DelegationContainer);
