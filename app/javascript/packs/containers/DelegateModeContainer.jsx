/**
 * Mode that allows user to delegate any remaining unanswered questions.
 * ROUTE - /buildings/:bId/delegate
 */

import React from 'react';

import QuestionContainer from './QuestionContainer';

import { getQuestionsByBuilding } from '../selectors/questionsSelector';
import { connect } from 'react-redux';

class DelegateModeContainer extends React.Component {

  render() {
    return (
      <div>
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
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    questions: getQuestionsByBuilding(ownProps.building.id, state)
  }
}

function mapDispatchToProps(dispatch) {
  return {}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DelegateModeContainer);
