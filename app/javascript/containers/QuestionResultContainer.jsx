import React from "react";

import { connect } from "react-redux";
import { getAnswerForQuestionAndBuilding } from "../selectors/answersSelector";
import { getDependentQuestionsForOptionIds } from "../selectors/questionsSelector";

class QuestionResultContainer extends React.Component {
  getFileLink() {
    return "/api/answers/" + this.props.answer.id;
  }

  render() {
    if (!this.props.answer) {
      return "";
    }

    if (!this.props.answer.text) {
      // Empty answer => there should be delegations to display
      const contactString =
        this.props.answer.delegation_first_name +
        " " +
        this.props.answer.delegation_last_name;
      return (
        <div>
          <p>Delegated to: {contactString}</p>
        </div>
      );
    }

    const result = (() => {
      switch (this.props.question_type) {
        case "DropdownOption":
          return <p>{this.props.answer.text}</p>;
        case "RangeOption":
          return <p>{this.props.answer.text}</p>;
        case "file":
          return (
            <a href={this.getFileLink}>
              {this.props.answer.attachment_file_name}
            </a>
          );
        default:
          return this.props.answer.text;
      }
    })();

    return (
      <div>
        <div className="question question--in-review">
          {result}
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
  return {};
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QuestionResultContainer);
