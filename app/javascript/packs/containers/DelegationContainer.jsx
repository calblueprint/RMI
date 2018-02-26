import React from 'react';

import { connect } from 'react-redux';
import { getDependentQuestionsForOptions } from "../selectors/questionsSelector";
import { getAnswerForQuestionAndBuilding } from "../selectors/answersSelector";

class DelegationContainer extends React.Component {

  // TODO: this.props.contacts cannot come from nowhere

  answerValid() {
    return this.props.answer.text || this.props.answer.attachment_file_name;
  }

  handleSelect(value) {

  }

  handleChangeEmail(value) {

  }

  handleChangeFirstName(value) {

  }

  handleChangeLastName(value) {

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
    dependentQuestions: getDependentQuestionsForOptions(ownProps.options, ownProps.question_type, state)
  }
}

function mapDispatchToProps(state, ownProps) {
  return {

  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DelegationContainer);
