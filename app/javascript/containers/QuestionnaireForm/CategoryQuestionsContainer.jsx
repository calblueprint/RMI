import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getQuestionsByCategoryId } from "../../selectors/questionsSelector";
import { newDefaultQuestion } from "../../utils/TemporaryObjectUtil";
import QuestionContainer from "./QuestionContainer";
import CategoryDisplay from "../../components/QuestionnaireForm/CategoryDisplay";
import {
  categoryFetchFailure,
  categoryFetchInProgress,
  categoryFetchSuccess,
  categoryPreFetchSave,
  removeCategory
} from "../../actions/categories";
import {
  beforeCreateNewQuestion,
  questionFetchFailure,
  questionFetchInProgress,
  questionFetchSuccess,
  questionSetNew
} from "../../actions/questions";
import { patch, post } from "../../fetch/requester";
import { getCategoryById } from "../../selectors/categoriesSelector";
import CreateQuestionButton from "../../components/QuestionnaireForm/CreateQuestionButton";

class CategoryQuestionsContainer extends React.Component {
  /**
   * Handles fetch request to update a question and redux update
   * @param { string } id - questionId to update
   * @param { Object } args - any question parameters
   */
  async updateCategory(id, args) {
    const updatedCategory = { ...this.props.category, ...args };
    this.props.categoryFetchInProgress(updatedCategory);
    try {
      let response = await patch("/api/categories/" + updatedCategory.id, {
        category: updatedCategory
      });
      this.props.categoryFetchSuccess(response.data);
    } catch (error) {
      this.props.categoryFetchFailure(error, updatedCategory);
    }
  }

  /**
   * Calls async fetch function during onBlur to create or update question object.
   * @param {string} id - questionId to update
   * @param {object} args - any question parameters
   */
  handleOnBlur(id, args) {
    this.updateCategory(id, args);
  }

  /**
   * Handles event for onChange which is updating redux temporarily.
   * If create new question, create a temp question in question store.
   * @param { string } id - questionId that is updating
   * @param { string } args - any question parameters
   */
  handleOnChange(id, args) {
    const updatedCategory = { ...this.props.category, ...args };
    this.props.categoryPreFetchSave(updatedCategory);
  }

  newTempQuestion() {
    const args = {
      building_type_id: this.props.buildingType.id,
      category_id: this.props.categoryId
    };
    return newDefaultQuestion(args);
  }

  render() {
    const questions_display = this.props.questionList.map(question => {
      if (question.parent_option_id === null) {
        return (
          <div key={question.id}>
            <QuestionContainer question={question} />
          </div>
        );
      }
    });

    const select = this.props.category.new || false;

    return (
      <div className="questionnaire-form-questions-container">
        <div>
          {questions_display}
          <CreateQuestionButton
            tempQuestion={this.newTempQuestion()}
            questionFetchSuccess={this.props.questionFetchSuccess}
            questionFetchFailure={this.props.questionFetchFailure}
            questionSetNew={this.props.questionSetNew}
            questionFetchInProgress={this.props.questionFetchInProgress}
          />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    questionList: getQuestionsByCategoryId(ownProps.categoryId, state),
    category: getCategoryById(ownProps.categoryId, state)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    beforeCreateNewQuestion: question => {
      dispatch(beforeCreateNewQuestion(question));
    },
    categoryFetchInProgress: category => {
      dispatch(categoryFetchInProgress(category));
    },
    categoryPreFetchSave: category => {
      dispatch(categoryPreFetchSave(category));
    },
    categoryFetchSuccess: category => {
      dispatch(categoryFetchSuccess(category));
    },
    categoryFetchFailure: (error, category) => {
      dispatch(categoryFetchFailure(error, category));
    },
    removeCategory: category => {
      dispatch(removeCategory(category));
    },
    questionFetchSuccess: question => {
      dispatch(questionFetchSuccess(question));
    },
    questionFetchFailure: (error, question) => {
      dispatch(questionFetchFailure(error, question));
    },
    questionSetNew: question => {
      dispatch(questionSetNew(question));
    },
    questionFetchInProgress: question => {
      dispatch(questionFetchInProgress(question));
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CategoryQuestionsContainer);

CategoryQuestionsContainer.propTypes = {
  questionList: PropTypes.array.isRequired,
  buildingType: PropTypes.object.isRequired,
  category: PropTypes.object.isRequired,
  categoryId: PropTypes.number.isRequired
};
