/**
 * Mode that allows user to delegate any remaining unanswered questions.
 * ROUTE - /buildings/:bId/delegate
 */

import React from 'react';

import QuestionContainer from './QuestionContainer';

// XXX: may be too inefficient
import { getDependentQuestionsForOption } from "../selectors/questionsSelector";
import { getQuestionsByBuilding } from '../selectors/questionsSelector';
import { connect } from 'react-redux';

class DelegateModeContainer extends React.Component {

  // recursively find all dependent questions, return a list
  getDependentQuestionIds(parentQuestion) {
    var potentialChildren = parentQuestion.options.map((option) => {
      return this.props.getDependentQuestion(option.id, parentQuestion.question_type);
    })

    if (potentialChildren.length == 0) {
      return [];
    } else {
      return potentialChildren.concat(potentialChildren.map(this.getDependentQuestionIds));
    }
  }

  // called when delegation should be submitted
  // should synchronously submit delegations since user expects success
  submitDelegation() {

  }

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

        <button type="submit" value="Submit Delegation"
          onClick={this.submitDelegation}
        >Submit Delegation</button>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    getDependentQuestion: (optionId, optionType) => {
      return getDependentQuestionsForOption(optionId, optionType, state);
    },
    questions: getQuestionsByBuilding(ownProps.building.id, state)
  }
}

function mapDispatchToProps(dispatch) {
  return {

  }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DelegateModeContainer);
