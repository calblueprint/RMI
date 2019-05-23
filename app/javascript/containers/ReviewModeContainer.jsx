/**
 * Mode that allows user to review all answers and delegations before submitting.
 * ROUTE - /buildings/:bId/review
 */

import React from "react";

import QuestionContainer from "./QuestionContainer";
import * as BuildingActions from "../actions/buildings";

import { getAnswerForQuestionAndBuilding } from "../selectors/answersSelector";
import { getAllActiveQuestionsForCategory, getPotentialDependentQuestions } from "../selectors/questionsSelector";
import { removeBuilding } from "../actions/buildings";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getQuestionsByBuilding } from "../selectors/questionsSelector";
import { getQuestionsByCategory } from "../utils/QuestionsFilter";
import { getCategoriesForBuilding } from "../selectors/categoriesSelector";
import CategoryHeader from "../components/CategoryHeader";

import { post, patch } from "../fetch/requester";

class ReviewModeContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status_string: "Delegations have not been saved yet."
    };
  }

  // called when delegation should be submitted
  // should synchronously submit delegations since user expects success
  async submitDelegation() {
    let delegations = this.getDelegations();
    let new_delegations = delegations["new_delegations"];
    let delegations_to_update = delegations["answered_question_ids"];


    try {
      if (new_delegations.length !== 0) {
        this.setState({ status_string: "Saving delegations!" });
        let response = await post("/api/delegations", {
          delegations: new_delegations
        });
        this.setState({ status_string: "New Delegations saved." });
      }
      if (delegations_to_update.length !== 0) {
        await patch("/api/delegations/set_completed", {
          delegations: delegations_to_update
        });
        this.setState({ status_string: "Completed answers saved." });
      }

      //TODO 4/23: Need to fix root routing so we don't have to do conditional routing here
      this.props.history.push(`/`);
      if (this.props.userType === "BuildingOperator") {
        this.props.removeBuilding(this.props.building.id);
      }

      //TODO: toastr success notification
    } catch (error) {
      this.setState({
        status_string: "Saving delegations failed. Try again?"
      });
      //TODO: toastr failure
    }
  }

  getDelegations() {
    let parentQuestionsForDelegations = [];
    this.props.questions.forEach(question => {
      let answer = this.props.getAnswer(question.id);
      if (answer && !answer.text && answer.delegation_email) {
        parentQuestionsForDelegations.push(question);
      }
    });

    let delegations = [];
    for (let i = 0; i < parentQuestionsForDelegations.length; i++) {
      let question = parentQuestionsForDelegations[i];
      let answer = this.props.getAnswer(question.id);
      let allDependentQuestions = this.props.getPotentialDependentQuestions(
        question
      );
      allDependentQuestions.push(question);

      allDependentQuestions.map(currentQuestion => {
        let currentAnswer = this.props.getAnswer(currentQuestion.id);
        if (currentAnswer) {
          let delegation = {
            email: answer.delegation_email,
            first_name: answer.delegation_first_name,
            last_name: answer.delegation_last_name,
            answer_id: currentAnswer.id
          };
          delegations.push(delegation);
        }
      });
    }

    const delegationIds = delegations.map(delegation => delegation.answer_id);

    // List of ids for answers that were filled out by the user but not delegated.
    // These still need to have their delegations marked as completed in the backend
    const answeredQuestionIds = this.props.questions
      .filter(question => this.props.editableMap[question.id])
      .map(question => this.props.getAnswer(question.id))
      .filter(answer => !delegationIds.includes(answer.id))
      .map(answer => { return {answer_id: answer.id} });

    return {
      new_delegations: delegations,
      answered_question_ids: answeredQuestionIds
    };
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
          <button
            type="submit"
            value="Submit Form"
            onClick={e => this.submitDelegation()}
            className="next-button next-button--submit"
          >
            Submit Form
          </button>
          <p>{this.state.status_string}</p>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    getPotentialDependentQuestions: question =>
      getPotentialDependentQuestions(question, state),
    getActiveQuestionsForCategory: (categoryId) => getAllActiveQuestionsForCategory(categoryId,
                                                      ownProps.building.id, state),
    building: state.buildings[ownProps.building.id],
    questions: getQuestionsByBuilding(ownProps.building.id, state),
    getAnswer: questionId =>
      getAnswerForQuestionAndBuilding(questionId, ownProps.building.id, state),
    categories: getCategoriesForBuilding(ownProps.building.id, state),
    userType: state.userType
  };
}

function mapDispatchToProps(dispatch) {
  return {
    buildingActions: bindActionCreators(BuildingActions, dispatch),
    removeBuilding: buildingId => {
      dispatch(removeBuilding(buildingId));
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReviewModeContainer);
