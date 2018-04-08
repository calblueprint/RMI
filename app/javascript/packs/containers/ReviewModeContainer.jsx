/**
 * Mode that allows user to review all answers and delegations before submitting.
 * ROUTE - /buildings/:bId/review
 */

import React from 'react';

import QuestionContainer from './QuestionContainer';

import { getAnswerForQuestionAndBuilding } from '../selectors/answersSelector';
import { getPotentialDependentQuestions } from "../selectors/questionsSelector";
import { connect } from 'react-redux';
import { getQuestionsByBuilding } from '../selectors/questionsSelector';

import { post, patch } from '../fetch/requester';

async function postDelegations(delegations) {
  var body = { delegations };

  try {
    let resp = await post('/api/delegations', body);
    return true;
  } catch (error) {
    return false;
  }
}

class ReviewModeContainer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      status_string: "Delegations have not been saved yet.",
    }
  }

  // called when delegation should be submitted
  // should synchronously submit delegations since user expects success
  async submitDelegation() {
    var parentQuestionsForDelegations = this.props.questions.filter((question) => {
      answer = this.props.getAnswer(question.id);
      return answer && !answer.text && answer.delegation_email;
    });

    var delegations = [];
    for (var i = 0; i < parentQuestionsForDelegations.length; i++) {
      var question = parentQuestionsForDelegations[i];
      var answer = this.props.getAnswer(question.id);
      var allDependentQuestions = this.props.getPotentialDependentQuestions(question);
      allDependentQuestions.push(question);

      allDependentQuestions.map((currentQuestion) => {
        var currentAnswer = this.props.getAnswer(currentQuestion.id);
        if (currentAnswer) {
          var delegation = {
            email: answer.delegation_email,
            first_name: answer.delegation_first_name,
            last_name: answer.delegation_last_name,
            answer_id: currentAnswer.id,
          }
          delegations.push(delegation);
        }
      })
      ;
    }

    this.setState({ status_string: "Saving delegations!" });
    var success = await postDelegations(delegations);
    if (success) {
      this.setState({ status_string: "Delegations saved." });
    } else {
      this.setState({ status_string: "Saving delegations failed. Try again?" });
    }
  }

  render() {
    return (
      <div>
        {this.props.questions.map((question) => {
          // Only display non-dependent questions initially
          if (question.parent_option_id) return null;
            return (
              <QuestionContainer
                mode="review"
                key={question.id}
                building_id={this.props.building.id}
                {...question}
              />
            );
        })}

        <button type="submit" value="Submit Delegation"
          onClick={(e) => this.submitDelegation()}
        >Submit Delegation</button>
        <p>{this.state.status_string}</p>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    getPotentialDependentQuestions: (question) => getPotentialDependentQuestions(question, state),
    questions: getQuestionsByBuilding(ownProps.building.id, state),
    getAnswer: (questionId) => getAnswerForQuestionAndBuilding(questionId, ownProps.building.id, state),
  };
}

function mapDispatchToProps(dispatch) {
  return {

  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReviewModeContainer);
