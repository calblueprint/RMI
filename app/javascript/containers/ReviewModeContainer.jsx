/**
 * Mode that allows user to review all answers and delegations before submitting.
 * ROUTE - /buildings/:bId/review
 */

import React from 'react';

import QuestionContainer from './QuestionContainer';

import {getAnswerForQuestionAndBuilding} from '../selectors/answersSelector';
import {getAllActiveQuestionsForCategory, getPotentialDependentQuestions} from "../selectors/questionsSelector";
import {connect} from 'react-redux';
import {getQuestionsByBuilding} from '../selectors/questionsSelector';
import {getQuestionsByCategory} from "../utils/QuestionsFilter";
import {getCategoriesForBuilding} from "../selectors/categoriesSelector";
import CategoryHeader from '../components/CategoryHeader';

import {post, patch} from '../fetch/requester';

async function postDelegations(delegations) {
  let body = {delegations};

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
    let parentQuestionsForDelegations = this.props.questions.filter((question) => {
      const answer = this.props.getAnswer(question.id);
      return answer && !answer.text && answer.delegation_email;
    });

    let delegations = [];
    for (let i = 0; i < parentQuestionsForDelegations.length; i++) {
      let question = parentQuestionsForDelegations[i];
      let answer = this.props.getAnswer(question.id);
      let allDependentQuestions = this.props.getPotentialDependentQuestions(question);
      allDependentQuestions.push(question);

      allDependentQuestions.map((currentQuestion) => {
        let currentAnswer = this.props.getAnswer(currentQuestion.id);
        if (currentAnswer) {
          let delegation = {
            email: answer.delegation_email,
            first_name: answer.delegation_first_name,
            last_name: answer.delegation_last_name,
            answer_id: currentAnswer.id,
          };
          delegations.push(delegation);
        }
      })
      ;
    }

    this.setState({status_string: "Saving delegations!"});
    console.log("Submitting delegations:");
    console.log(delegations);
    let success = await postDelegations(delegations);
    if (success) {
      this.setState({status_string: "Delegations saved."});
    } else {
      this.setState({status_string: "Saving delegations failed. Try again?"});
    }
  }

  mapCategorytoQuestions(categoryId, building) {
    const categoryQuestions = this.props.getActiveQuestionsForCategory(categoryId);
    return categoryQuestions.map((question) => {
      // Don't display non-editable questions
      // (These weren't delegated to the current user, and are only there to show context
      //  or to trigger a relevant follow-up question)
      if (!this.props.editableMap[question.id]) {
        return null;
      }

      return (
        <QuestionContainer
          mode="review"
          key={question.id}
          building_id={building.id}
          {...question}
        />
      );
    })
  }

  populateQuestionStack(building, questions) {
    let count = 0;
    let stack = [];
    for (let category in this.props.categories) {
      let stateCategory = this.props.categories[category];
      count += 1;
      stack.push(<CategoryHeader
        category={stateCategory}
        number={count}
        buildingId={building.id}
      />);
      stack = stack.concat(
        <table cellSpacing="0">
          <tbody>
          {this.mapCategorytoQuestions(stateCategory.id, building)}
          </tbody>
        </table>
      );
    }
    return stack;
  }


  render() {
    return (
      <div>
        {this.populateQuestionStack(this.props.building, this.props.questions)}
        <div className="delegation">
          <button type="submit"
                  value="Submit Form"
                  onClick={(e) => this.submitDelegation()}
                  className="next-button next-button--submit"
          >Submit Form
          </button>
          <p>{this.state.status_string}</p>
        </div>
      </div>
    );
  }
}


function mapStateToProps(state, ownProps) {
  return {
    getPotentialDependentQuestions: (question) => getPotentialDependentQuestions(question, state),
    getActiveQuestionsForCategory: (categoryId) => getAllActiveQuestionsForCategory(categoryId,
                                                      ownProps.building.id, state),
    building: state.buildings[ownProps.building.id],
    questions: getQuestionsByBuilding(ownProps.building.id, state),
    getAnswer: (questionId) => getAnswerForQuestionAndBuilding(questionId, ownProps.building.id, state),
    categories: getCategoriesForBuilding(ownProps.building.id, state),
  };
}

function mapDispatchToProps(dispatch) {
  return {}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReviewModeContainer);
