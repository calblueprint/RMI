import React from 'react';

import * as ContactActions from '../actions/contacts';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getDependentQuestionsForOptions } from "../selectors/questionsSelector";
import { getAnswerForQuestionAndBuilding } from "../selectors/answersSelector";
import { getContacts } from "../selectors/contactsSelector";

class DelegationContainer extends React.Component {

  // TODO: this.props.contacts cannot come from nowhere

  // TODO: need to add current value of delegations to redux, if they aren't empty

  // determine whether answers are available
  answerValid() {
    return this.props.answer.text || this.props.answer.attachment_file_name;
  }

  handleSelect(value) {

  }

  // Need tp dispatch actions to update answer in redux, then send to backend
  // XXX: Blocked on answer actions by Kevin Li
  handleChangeEmail(value) {

  }

  handleChangeFirstName(value) {

  }

  handleChangeLastName(value) {

  }

  // If email, firstname and lastname are valid pair, then
  // this function should be called to update contacts stored
  // in redux, and make it available in future references
  createOrUpdateContacts() {

  }

  renderUnanswered() {
    const currentEmail = this.props.email;
    const currentFirstName = this.props.firstName;
    const currentLastName = this.props.lastName;

    return (
    <div>
      Assign to other users:<br></br>

      Email:<br></br>
      <input type="text" value={currentEmail}
        onChange={(e) => this.handleChangeEmail(e.target.value)}
      />

      <select onChange={(e) => this.handleSelect([e.target.value])}
              defaultValue={currentEmail}>
        {Object.values(this.props.contacts).map((contact) => {
          return (<option value={contact.email} key={contact.email}>
              {contact.first_name + contact.last_name}</option>)
        })}
      </select>

      First name:<br></br>
      <input type="text" value={currentFirstName}
        onChange={(e) => this.handleChangeFirstName(e.target.value)}
      />

      Last name:<br></br>
      <input type="text" value={currentLastName}
        onChange={(e) => this.handleChangeLastName(e.target.value)}
      />
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

    return ({dependentQuestions});
  }

  render() {
    if (this.answerValid()) {
      return renderAnswered();
    } else {
      return renderUnanswered();
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
