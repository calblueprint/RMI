import React from 'react';
import Question from '../../components/QuestionnaireForm/Question';
import DepQuestionContainer from './DepQuestionContainer';
import OptionsContainer from './OptionsContainer'
import {connect} from 'react-redux';
import {
  beforeCreateNewQuestion,
  questionFetchInProgress,
  questionPreFetchSave,
  questionFetchSuccess,
  questionFetchFailure,
  removeQuestion
} from '../../actions/questions';
import {patch, post} from '../../fetch/requester';
import PropTypes from 'prop-types'

class QuestionContainer extends React.Component {

  async updateQuestion(id, args) {
    const updatedQuestion = {...this.props.question, ...args};
    this.props.questionFetchInProgress(updatedQuestion);

    try {
      let response = await patch('/api/questions/' + updatedQuestion.id, {'question': updatedQuestion});
      this.props.questionFetchSuccess(response.data);
    } catch (error) {
      this.props.questionFetchFailure(error);
    }
  }

  async createQuestion(id, args) {
    const newQuestion = {...this.props.question, ...args};
    const tempQuestion = this.props.question
    this.props.questionFetchInProgress(newQuestion);
    try {
      let response = await post('/api/questions', {'question': newQuestion});
      this.props.questionFetchSuccess(response.data);
      this.props.removeQuestion(tempQuestion);
    } catch (error) {
      this.props.questionFetchFailure(error);
    }
  }

  handleOnBlur(id, args) {
    if (this.props.question.temp) {
      this.createQuestion(id, args);
    } else {
      this.updateQuestion(id, args)
    }
  }

  handleOnChange(id, args) {
    const updatedQuestion = {...this.props.question, ...args}
    this.props.questionPreFetchSave(updatedQuestion)
  }
  //props: question

  selectQtype(qType) {
    const question = { ...this.props.question, question_type: qType };
    this.props.beforeCreateNewQuestion(question);
  }

  render() {
    const focus = this.props.question.temp || false;

    if (!this.props.question.question_type) {
      const qTypes = ['range', 'dropdown', 'free'];
      const options = qTypes.map((qType) => {
        return (
          <option value={qType}>
            {qType}
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
    questionFetchInProgress: question => { dispatch(questionFetchInProgress(question)) },
    questionPreFetchSave: question => { dispatch(questionPreFetchSave(question)) },
    beforeCreateNewQuestion: (question) => {dispatch(beforeCreateNewQuestion(question))},
    questionFetchSuccess: (question) => {dispatch(questionFetchSuccess(question))},
    questionFetchFailure: (question) => { dispatch(questionFetchFailure(question)) },
    removeQuestion: (question) => { dispatch(removeQuestion(question))}
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QuestionContainer);

QuestionContainer.propTypes = {
  question: PropTypes.object.isRequired,
  dependent: PropTypes.bool
};
