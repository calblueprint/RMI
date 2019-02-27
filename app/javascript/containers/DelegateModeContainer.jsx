/**
 * Mode that allows user to delegate any remaining unanswered questions.
 * ROUTE - /buildings/:bId/delegate
 */

import React from 'react';

import QuestionContainer from './QuestionContainer';

import { getQuestionsByBuilding } from '../selectors/questionsSelector';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { numUnanswered } from '../selectors/answersSelector';

class DelegateModeContainer extends React.Component {
  
  findNextPage() {
    return "/buildings/" + String(this.props.building.id)  + "/review"
  }

  buttonStyle() {
    if (this.props.numUnanswered > 0) { 
      return {"pointer-events": "none", "background-color": "#969696"};
    }
  }

  render() {
    return (
      <div className="question__container">
        {this.props.questions.map((question) => {
          // It's left to DelegationContainer to decide whether this question
          // needs delegation, i.e. is unanswered

          // Only display non-dependent questions initially
          if (!question.parent_option_id) {
            return (<QuestionContainer mode="delegation"
                                       key={question.id}
                                       building_id={this.props.building.id}
                                       {...question} />);
          }
        })
        }
        <Link style={this.buttonStyle()} class="to-submit-button" to={this.findNextPage()}>Review and Submit</Link>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    questions: getQuestionsByBuilding(ownProps.building.id, state),
    numUnanswered: numUnanswered(ownProps.building.id, state)
  }
}

function mapDispatchToProps(dispatch) {
  return {}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DelegateModeContainer);
