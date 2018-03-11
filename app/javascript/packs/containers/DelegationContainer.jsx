import React from 'react';

import QuestionContainer from './QuestionContainer';

import * as ContactActions from '../actions/contacts';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getDependentQuestionsForOptions } from "../selectors/questionsSelector";
import { getAnswerForQuestionAndBuilding } from "../selectors/answersSelector";
import { getContacts } from "../selectors/contactsSelector";

class DelegationContainer extends React.Component {
  constructor(props) {
    super(props);
    if (this.props.answer) {
      this.state = {
        email: this.props.answer.delegation_email,
        firstName: this.props.answer.delegation_first_name,
        lastName: this.props.answer.delegation_last_name,
      };
    } else {
      this.state = {
        email: "",
        firstName: "",
        lastName: "",
      };
    }
  }

  // TODO: need to add current value of delegations to redux, if they aren't empty

  // determine whether answers are available
  answerValid() {
    if (this.props.answer) {
      return this.props.answer.text || this.props.answer.attachment_file_name;
    } else {
      return false;
    }
  }

  handleSelect(value) {

  }

  afterUpdateState() {
    this.createOrUpdateContactsIfValid();
    this.updateAnswer();
  }

  // Need tp dispatch actions to update answer in redux, then send to backend
  // XXX: Blocked on answer actions by Kevin Li
  handleChange(key, value) {
    this.setState((state) => ({ [key]: value}), this.afterUpdateState);
  }

  // If email, firstname and lastname are valid pair, then
  // this function should be called to update contacts stored
  // in redux, and make it available in future references
  createOrUpdateContactsIfValid() {
    // TODO: should validate for valid email address here
    if (this.state.email && this.state.firstName && this.state.lastName) {
      this.props.contactActions.addContact(
          this.state.email, this.state.firstName, this.state.lastName);
    }
  }

  updateAnswer() {
    // Need to keep answers up to date as during editing

  }

  renderUnanswered() {
    const currentEmail = this.state.email;
    const currentFirstName = this.state.firstName;
    const currentLastName = this.state.lastName;

    return (
    <div>
      <p>{this.props.text}</p>
      Assign to other users:<br></br>

      Email:<br></br>
      <input type="text" value={currentEmail}
        onChange={(e) => this.handleChange("email", e.target.value)}
      /><br></br>

      <select onChange={(e) => this.handleSelect([e.target.value])}
              defaultValue={currentEmail}>
        {Object.values(this.props.contacts).map((contact) => {
          return (<option value={contact.email} key={contact.email}>
              {contact.first_name + contact.last_name}</option>)
        })}
      </select><br></br>

      First name:<br></br>
      <input type="text" value={currentFirstName}
        onChange={(e) => this.handleChange("firstName", e.target.value)}
      /><br></br>

      Last name:<br></br>
      <input type="text" value={currentLastName}
        onChange={(e) => this.handleChange("lastName", e.target.value)}
      /><br></br>
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

  render() {
    if (this.answerValid()) {
      return this.renderAnswered();
    } else {
      return this.renderUnanswered();
    }
  }
}

function mapStateToProps(state, ownProps) {
  return {
    answer: getAnswerForQuestionAndBuilding(ownProps.question_id, ownProps.building_id, state),
    dependentQuestions: getDependentQuestionsForOptions(ownProps.options, ownProps.question_type, state),
    contacts: getContacts(state)
  }
}

function mapDispatchToProps(dispatch) {
  return {
    contactActions: bindActionCreators(ContactActions, dispatch)
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DelegationContainer);
