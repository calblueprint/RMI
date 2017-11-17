import React from 'react';
import { connect } from 'react-redux';
import { getAnswerForQuestionAndBuilding } from "../selectors/answersSelector";
import { getDependentQuestionsForOptions } from "../selectors/questionsSelector";

class OptionsContainer extends React.Component {
  render() {
    return (<div>
      {Object.keys(this.props.options).map((id) => {
        var option = this.props.options[id];
        return (<p key={id}>{option.text}</p>);
      })}
    </div>)
  }
}

function mapStateToProps(state, ownProps) {
  return {
    answer: getAnswerForQuestionAndBuilding(ownProps.question_id, ownProps.building_id, state),
    dependentQuestions: getDependentQuestionsForOptions(ownProps.options, state)
  }
}

function mapDispatchToProps(state, ownProps) {
  return {

  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OptionsContainer);