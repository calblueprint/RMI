import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import OptionsContainer from "./OptionsContainer";
import QuestionResultContainer from "./QuestionResultContainer";
import DelegationContainer from "./DelegationContainer";
import {
  getAnswerForQuestionAndBuilding,
  isDelegatedAnswer
} from "../selectors/answersSelector";

class QuestionContainer extends React.Component {
  // this.props.mode can be
  // "answer": answering mode
  // "review": reviewing mode
  // "delegation": delegation mode

  renderAnswerMode() {
    return (
      <OptionsContainer
        question_id={this.props.id}
        building_id={this.props.building_id}
        question_type={this.props.question_type}
        options={this.props.options}
        text={this.props.text}
        setFocusFunc={this.props.setFocusFunc}
        unit={this.props.unit}
        answer={this.props.answer}
        focusOnMount={this.props.focusOnMount}
        parentIsHidden={this.props.parentIsHidden}
      />
    );
  }

  renderReviewMode() {
    return (
      <tr>
        <td>{this.props.text}</td>
        <QuestionResultContainer
          text={this.props.text}
          question_id={this.props.id}
          building_id={this.props.building_id}
          question_type={this.props.question_type}
          options={this.props.options}
        />
      </tr>
    );
  }

  renderDelegationMode() {
    return (
      <div>
        <DelegationContainer
          text={this.props.text}
          question_id={this.props.id}
          question_type={this.props.question_type}
          options={this.props.options}
          building_id={this.props.building_id}
        />
      </div>
    );
  }

  render() {
    if (this.props.mode === "review") {
      return this.renderReviewMode();
    }
    if (
      this.props.mode === "delegation" ||
      isDelegatedAnswer(this.props.answer)
    ) {
      return this.renderDelegationMode();
    }
    return this.renderAnswerMode();
  }
}

function mapStateToProps(state, ownProps) {
  return {
    answer: getAnswerForQuestionAndBuilding(
      ownProps.id,
      ownProps.building_id,
      state
    )
  };
}

export default connect(mapStateToProps)(QuestionContainer);

QuestionContainer.propTypes = {
  id: PropTypes.number.isRequired,
  building_id: PropTypes.number.isRequired,
  question_type: PropTypes.string.isRequired,
  options: PropTypes.object.isRequired,
  text: PropTypes.string.isRequired,
  mode: PropTypes.string.isRequired,
  unit: PropTypes.string,
  answer: PropTypes.shape({
    // Optional - new questions can have no answer
  }),
  focusOnMount: PropTypes.bool,
  parentIsHidden: PropTypes.bool
};
