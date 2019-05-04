/**
 * Mode that allows user to delegate any remaining unanswered questions.
 * ROUTE - /buildings/:bId/delegate
 */

import React from "react";

import QuestionContainer from "./QuestionContainer";
import { getQuestionsByBuilding, getAllQuestionsByCategory } from "../selectors/questionsSelector";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getNumUnansweredForBuilding } from "../selectors/answersSelector";

class DelegateModeContainer extends React.Component {
  findNextPage() {
    return "/buildings/" + String(this.props.building.id) + "/review";
  }

  buttonStyle() {
    if (this.props.numUnanswered > 0) {
      return { "pointer-events": "none", "background-color": "#969696" };
    }
  }

  render() {
    return (
      <div className="question__container">
        {Object.keys(this.props.questionsByCategory).map(categoryName => {
          // It's left to DelegationContainer to decide whether this question
          // needs delegation, i.e. is unanswered

          // Only display non-dependent questions initially
          let questions = this.props.questionsByCategory[categoryName];
          let questionContainers = questions.map(question => {
            if (!question.parent_option_id) {
              return (
                  <QuestionContainer
                  mode="delegation"
                  key={`delegate_${question.id}`}
                  building_id={this.props.building.id}
                  {...question}
                  />                
              );
            }
          })
          return (<div className="delegation--category"><h2>{categoryName}</h2>{questionContainers}<hr></hr></div>)
        })}
          
        <Link
          style={this.buttonStyle()}
          class="next-button"
          to={this.findNextPage()}
        >
          <b>Next:</b> Review and Submit
        </Link>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    questions: getQuestionsByBuilding(ownProps.building.id, state),
    questionsByCategory: getAllQuestionsByCategory(ownProps.building.id, state),
    numUnanswered: getNumUnansweredForBuilding(ownProps.building.id, state)
  };
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DelegateModeContainer);
