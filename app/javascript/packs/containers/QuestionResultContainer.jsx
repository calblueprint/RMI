import React from 'react';

import { connect } from 'react-redux';
import { getAnswerForQuestionAndBuilding } from "../selectors/answersSelector";
import { getDependentQuestionsForOptionIds } from "../selectors/questionsSelector";

import QuestionContainer from "./QuestionContainer";

class QuestionResultContainer extends React.Component {

  getFileLink() {
    return "/api/answers/" + this.props.answer.id;
  }

  render() {
    if (!this.props.answer) {
      return ("");
    }

    if (!this.props.answer.text) {
      // Empty answer => there should be delegations to display
      const contactString = this.props.answer.delegation_first_name + " " +
        this.props.answer.delegation_last_name;
      return (
            "Delegated to:" + {contactString})
    }

    const result = (() => {
      switch (this.props.question_type) {
        case "DropdownOption":
          return (this.props.answer.selected_option_id);
        case "RangeOption":
          return (this.props.answer.text);
        case "file":
          return (
            <a href={this.getFileLink}>{this.props.answer.attachment_file_name}</a>
          );
        default:
          return this.props.answer.text;
      }
    })();

    const dependentQuestions = (() => {
      if (this.props.answer) {
        const dependents = this.props.dependentQuestions[this.props.answer.selected_option_id];
        if (dependents) {
          return dependents.map(question => {
            return (
              <QuestionContainer mode="review"
                                 building_id={this.props.building_id} {...question} />
            );
          });
        }
      }
    })();

    return (
      <td>
        {result}
        {/*{dependentQuestions}*/}
      </td>
      );
  }
};

function mapStateToProps(state, ownProps) {
  return {
    answer: getAnswerForQuestionAndBuilding(ownProps.question_id, ownProps.building_id, state),
    dependentQuestions: getDependentQuestionsForOptionIds(Object.keys(ownProps.options), ownProps.question_type, state)
  }
}

function mapDispatchToProps(dispatch) {
  return {}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QuestionResultContainer);
