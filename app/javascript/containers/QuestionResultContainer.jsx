import React from "react";

import { connect } from "react-redux";
import { getAnswerForQuestionAndBuilding } from "../selectors/answersSelector";
import { getDependentQuestionsForOptionIds } from "../selectors/questionsSelector";

import QuestionContainer from "./QuestionContainer";

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
          return <p>{this.props.answer.selected_option_id}</p>;
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

    const dependentQuestions = (() => {
      if (this.props.answer) {
        const dependents = this.props.dependentQuestions[
          this.props.answer.selected_option_id
        ];
        if (dependents) {
          return dependents.map(question => {
            return (
              <div key={question.id}>
                <QuestionContainer
                  mode="review"
                  building_id={this.props.building_id}
                  {...question}
                />
              </div>
            );
          });
        }
      }
    })();

    return (
      <div>
        <div className="question">
          <p>{this.props.text}</p>
          {result}
        </div>
        <div className="questions__nested">{dependentQuestions}</div>
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
