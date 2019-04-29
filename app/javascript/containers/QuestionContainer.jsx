import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router";

import OptionsContainer from "./OptionsContainer";
import QuestionResultContainer from "./QuestionResultContainer";
import DelegationContainer from "./DelegationContainer";
import {
  getAnswerForQuestionAndBuilding,
  isDelegatedAnswer
} from "../selectors/answersSelector";

class QuestionContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isDelegating:
        this.props.mode === "delegation" || isDelegatedAnswer(this.props.answer)
    };
  }

  // this.props.mode refers to the navigation mode that
  // this QuestionContainer is being rendered from.
  //
  // It can be:
  // - "answer": answering mode (/edit)
  // - "review": reviewing mode (/review)
  // - "delegation": delegation mode (/delegate)

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
        onDelegationAdd={this.onDelegationAdd.bind(this)}
        editableMap={this.props.editableMap}
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
          editableMap={this.props.editableMap}
        />
      </tr>
    );
  }

  renderDelegationMode() {
    return (
      <div>
        <DelegationContainer
          mode={this.props.mode}
          text={this.props.text}
          question_id={this.props.id}
          question_type={this.props.question_type}
          options={this.props.options}
          building_id={this.props.building_id}
          onDelegationRemove={this.onDelegationRemove.bind(this)}
          onDelegationCancel={this.onDelegationCancel.bind(this)}
          editableMap={this.props.editableMap}
        />
      </div>
    );
  }

  onDelegationAdd() {
    this.setState({ isDelegating: true });
  }

  // Clicks "X" button on a DelegationContactCard
  onDelegationRemove() {
    if (this.props.mode === "answer") {
      this.setState({ isDelegating: false });
    }
  }

  // Clicks: "Answer Question"
  onDelegationCancel() {
    this.onDelegationRemove();
    if (this.props.mode === "delegation") {
      this.props.history.push(
        `/buildings/${this.props.building_id}/edit/${this.props.category_id}`
      );
    }
  }

  render() {
    if (this.props.mode === "review") {
      return this.renderReviewMode();
    }

    // Show the inline delegation component if:
    // - We're in the /delegate mode
    // - We've entered a delegation state locally (in the question)
    // - The answer is already delegated
    if (
      this.props.mode === "delegation" ||
      this.state.isDelegating ||
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

export default withRouter(connect(mapStateToProps)(QuestionContainer));

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
