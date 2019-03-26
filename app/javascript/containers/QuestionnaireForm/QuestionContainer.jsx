import React from 'react';
import Question from '../../components/QuestionnaireForm/Question';
import DepQuestionContainer from './DepQuestionContainer';
import { getQuestionByQuestionId } from '../../selectors/questionsSelector';
import { connect } from 'react-redux';
import {
  beforeCreateNewQuestion,
  questionFetchInProgress,
  questionPreFetchSave,
  questionFetchSuccess,
  questionFetchFailure,
  questionDeleteSuccess,
  questionDeleteFailure,
  questionDeleteInProgress,
  removeQuestion,
} from '../../actions/questions';
import { patch, post, destroy } from '../../fetch/requester';
import PropTypes from 'prop-types'

class QuestionContainer extends React.Component {

  /**
   * Handles fetch request to update a question and redux update
   * @param { string } id - questionId to update
   * @param { Object } args - any question parameters
   */
  async updateQuestion(id, args) {
    const updatedQuestion = {...this.props.question, ...args};
    this.props.questionFetchInProgress(updatedQuestion);
    try {
      let response = await patch('/api/questions/' + updatedQuestion.id, {'question': updatedQuestion});
      this.props.questionFetchSuccess(response.data);
    } catch (error) {
      this.props.questionFetchFailure(error, updatedQuestion);
    }
  }

  /**
   * Handles request to delete a question and redux update
   * @param { string } id - categoryId to update
   * @param { Object } args - any category parameters
   */
  async removeQuestion(id, args) {
   const removedQuestion = { ...this.props.question, ...args };
   this.props.questionDeleteInProgress(removedQuestion);
   try {
     let response = await destroy("/api/questions/" + removedQuestion.id);
     this.props.questionDeleteSuccess(removedQuestion);
     this.props.removeQuestion(removedQuestion);
   } catch (error) {
     this.props.questionDeleteFailure(error, removedQuestion);
   }
 }

  /**
   * Calls async fetch function during onBlur to create or update question object.
   * @param {string} id - questionId to update
   * @param {object} args - any question parameters
   */
  handleOnBlur(id, args) {
    if (this.props.question.temp) {
      this.createQuestion(id, args);
    } else {
      this.updateQuestion(id, args)
    }
  }

  /**
   * Calls async fetch function during onRemove to delete category object.
   * @param {string} id - categoryId to update
   * @param {object} args - any category parameters
   */
  handleOnRemove(id, args) {
    this.removeQuestion(id, args);
  }

  /**
   * Handles event for onChange which is updating redux temporarily.
   * If create new question, create a temp question in question store.
   * @param { string } id - questionId that is updating
   * @param { string } args - any question parameters
   */
  handleOnChange(id, args) {
    const updatedQuestion = {...this.props.question, ...args}
    this.props.questionPreFetchSave(updatedQuestion)
  }



  render() {
    const select = !!this.props.question.new;
    const options = Object.keys(this.props.question.options).filter((optionId) => {
      const option = this.props.question.options[optionId];
      return option['deleted'] !== true
    });
    if (this.props.question['deleted']) {
      return null;
    }
    return (
      <div>
        <div
          className={'mega-question-block'}
        >
          <Question
            question={this.props.question}
            handleOnRemove={this.handleOnRemove.bind(this)}
            handleOnBlur={this.handleOnBlur.bind(this)}
            handleOnChange={this.handleOnChange.bind(this)}
            select={select}
          />
        </div>
        { Object.keys(this.props.question.options).length !== 0 ?
          <DepQuestionContainer
            question={this.props.question}
            optionIdList={Object.keys(this.props.question.options)}
          /> : null}
      </div>
    );
  }

}

function mapStateToProps(state, ownProps) {
  return {
    question: getQuestionByQuestionId(ownProps.question.id, state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    questionFetchInProgress: (question) => { dispatch(questionFetchInProgress(question)) },
    questionPreFetchSave: (question) => { dispatch(questionPreFetchSave(question)) },
    beforeCreateNewQuestion: (question) => {dispatch(beforeCreateNewQuestion(question))},
    questionFetchSuccess: (question) => {dispatch(questionFetchSuccess(question))},
    questionFetchFailure: (error, question) => { dispatch(questionFetchFailure(error, question)) },
    questionDeleteInProgress: question => { dispatch(questionDeleteInProgress(question)) },
    questionDeleteSuccess: question => { dispatch(questionDeleteSuccess(question)) },
    questionDeleteFailure: (error, question) => { dispatch(questionDeleteFailure(error, question)) },
    removeQuestion: question => { dispatch(removeQuestion(question)); },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QuestionContainer);

QuestionContainer.propTypes = {
  question: PropTypes.object.isRequired,
};
