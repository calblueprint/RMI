/**
 * The default mode that allows the user to answer questions about a building.
 * ROUTE - /buildings/:bId/edit
 */

import React from 'react';
import PropTypes from 'prop-types';
import QuestionContainer from './QuestionContainer';

import { connect } from 'react-redux';
import { getQuestionsByBuilding } from '../selectors/questionsSelector';
import { getQuestionsByCategory } from '../utils/QuestionsFilter'

import { Link } from 'react-router-dom';

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
        <Link to="/buildings/3/edit/6">
          <button className="btn btn--primary">
            {"Next: " + (this.props.match.params.cId == 5 ? "Utilities" : "Interior Lighting")}
          </button>
        </Link>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    questions: getQuestionsByCategory(ownProps.match.params.cId, getQuestionsByBuilding(ownProps.building.id, state)),
  };
}

function mapDispatchToProps(dispatch) {
  return {};
}

AnswerModeContainer.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.object).isRequired, // TODO: Question Flow type
  building: PropTypes.object.isRequired, // TODO: Building Flow type
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AnswerModeContainer);
