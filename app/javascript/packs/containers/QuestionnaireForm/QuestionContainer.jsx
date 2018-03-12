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
  questionFetchFailure
} from '../../actions/questions';
import {patch} from '../../fetch/requester';

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
        <select onChange={ e => this.selectQtype(e.target.value) }>
          { options }
        </select>
      )
    }

    return (
      <div style={{border: "1px solid black"}}>
        <Question
          question={this.props.question}
          updateQuestion={this.updateQuestion.bind(this)}
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
    questionFetchFailure: (question) => { dispatch(questionFetchFailure(question)) }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QuestionContainer);
