import React from 'react';
import Question from '../../components/QuestionnaireForm/Question';
import DepQuestionContainer from './DepQuestionContainer';

import { connect } from 'react-redux';
import {
  beforeCreateNewQuestion,
  questionFetchInProgress,
  questionPreFetchSave,
  questionFetchSuccess,
  questionFetchFailure,
} from '../../actions/questions';
import { patch, post } from '../../fetch/requester';
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
    })

    return (
      <div>
        <div
          className={'mega-question-block'}
        >
          <Question
            question={this.props.question}
            handleOnBlur={this.handleOnBlur.bind(this)}
            handleOnChange={this.handleOnChange.bind(this)}
            select={select}
          />
        </div>
        { Object.keys(this.props.question.options).length !== 0 ?
          <DepQuestionContainer
            question={this.props.question}
            optionIdList={Object.keys(options)}
          /> : null}
      </div>
    );
  }

}

function mapStateToProps(state, ownProps) {
  return {
  };
}

function mapDispatchToProps(dispatch) {
  return {
    questionFetchInProgress: (question) => { dispatch(questionFetchInProgress(question)) },
    questionPreFetchSave: (question) => { dispatch(questionPreFetchSave(question)) },
    beforeCreateNewQuestion: (question) => {dispatch(beforeCreateNewQuestion(question))},
    questionFetchSuccess: (question) => {dispatch(questionFetchSuccess(question))},
    questionFetchFailure: (error, question) => { dispatch(questionFetchFailure(error, question)) },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QuestionContainer);

QuestionContainer.propTypes = {
  question: PropTypes.object.isRequired,
};
