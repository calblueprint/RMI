/**
 * The default mode that allows the user to answer questions about a building.
 * ROUTE - /buildings/:bId/edit
 */

import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import QuestionContainer from './QuestionContainer';

import { connect } from 'react-redux';
import { getQuestionsByBuilding } from '../selectors/questionsSelector';
import { getCategoriesForBuilding } from '../selectors/categoriesSelector';
import { getQuestionsByCategory } from '../utils/QuestionsFilter'

class AnswerModeContainer extends React.Component {
  getNextCategoryButton() {
    const bId = this.props.building.id;
    const cId = Number(this.props.match.params.cId);
    const isLastCategory = this.props.match.params.cId == this.props.categories.length;
    const nextEditPath = isLastCategory ? 'delegate' : `edit/${cId + 1}`;
    const nextCategoryName = isLastCategory ? "Handoff" : this.props.categories[cId].name;

    return (
      <Link to={`/buildings/${bId}/${nextEditPath}`}>
        <button className="btn btn--primary">
          {"Next: " + nextCategoryName}
        </button>
      </Link>
    );
  }

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
        {this.getNextCategoryButton()}
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    questions: getQuestionsByCategory(ownProps.match.params.cId, getQuestionsByBuilding(ownProps.building.id, state)),
    categories: getCategoriesForBuilding(ownProps.building.id, state)
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
