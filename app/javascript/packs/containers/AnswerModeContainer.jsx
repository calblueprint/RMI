/**
 * The default mode that allows the user to answer questions about a building.
 * ROUTE - /buildings/:bId/edit
 */

import React from 'react';

import QuestionContainer from './QuestionContainer';

import { connect } from 'react-redux';
import { getQuestionsByBuilding } from '../selectors/questionsSelector';

class AnswerModeContainer extends React.Component {
  render() {
    return (
      <div className="question__container">
        {this.props.questions.map((question) => {
          // Only display non-dependent questions initially
          if (question.parent_option_id) return null;
            return (
              <QuestionContainer
                mode="answer"
                key={question.id}
                building_id={this.props.building.id}
                {...question}
              />
            );
        })}
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    questions: getQuestionsByBuilding(ownProps.building.id, state)
  };
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AnswerModeContainer);
