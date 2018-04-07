import React from 'react';
import Question from '../../components/QuestionnaireForm/Question';
import DepQuestionContainer from './DepQuestionContainer';
import OptionsContainer from './OptionsContainer'
import { connect } from 'react-redux';
import {
  beforeCreateNewQuestion,
  questionFetchInProgress,
  questionPreFetchSave,
  questionFetchSuccess,
  questionFetchFailure,
  removeQuestion
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
   * Handles fetch request to post a question and redux update
   * @param { string } id - questionId to update
   * @param { Object } args - any question parameters
   */
  async createQuestion(id, args) {
    const newQuestion = {...this.props.question, ...args};
    const tempQuestion = this.props.question;
    this.props.questionFetchInProgress(newQuestion);
    try {
      let response = await post('/api/questions', {'question': newQuestion});
      this.props.questionFetchSuccess(response.data);
      this.props.removeQuestion(tempQuestion);
    } catch (error) {
      this.props.questionFetchFailure(error, newQuestion);
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

  /**
   * Handles onChange even for selecting new question type by creating
   * temporary question in store.
   * @param {string} qType - question_type
   */
  selectQtype(qType) {
    const question = { ...this.props.question, question_type: qType };
    this.props.beforeCreateNewQuestion(question);
  }

  render() {
    const focus = this.props.question.temp || false;

    if (!this.props.question.question_type) {
      const qTypesDisplay = {
        'RangeOption': 'numeric',
        'DropdownOption': 'dropdown',
        'free': 'free response'};
      const options = Object.keys(qTypesDisplay).map((qType, index) => {
        return (
          <option
            value={qType}
            key={index}
          >
            {qTypesDisplay[qType]}
          </option>
        )
      });
      return (
        <select
          onChange={ e => this.selectQtype(e.target.value) }
          value={1}
        >
          { options }
          <option disabled value={1}>Select an Option</option>
        </select>
      )
    }

    return (
      <div style={{border: "1px solid black"}}>
        <Question
          question={this.props.question}
          handleOnBlur={this.handleOnBlur.bind(this)}
          handleOnChange={this.handleOnChange.bind(this)}
          focus={focus}
        />
        <OptionsContainer
          question={this.props.question}
        />
        <DepQuestionContainer
          question={this.props.question}
          optionsList={Object.keys(this.props.question.options)}
        />
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
    removeQuestion: (question) => { dispatch(removeQuestion(question))}
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QuestionContainer);

QuestionContainer.propTypes = {
  question: PropTypes.object.isRequired,
};
