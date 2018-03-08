import React from 'react';
import Question from '../../components/QuestionnaireForm/Question';
import DepQuestionContainer from './DepQuestionContainer';
import OptionsContainer from './OptionsContainer'
import {connect} from 'react-redux';
import questionFetchInProgress from '../../actions/questions';
import questionPreFetchSave from '../../actions/questions';
import {optionFetchInProgress, optionPreFetchSave} from '../../actions/options';

class QuestionContainer extends React.Component {
  updateQuestion(id, args) {
    const updatedQuestion = {...this.props.question[id], ...args}
    this.props.questionFetchInProgress(updatedQuestion)
  }

  handleOnChange(id, args) {
    const updatedQuestion = {...this.props.question[id], ...args}
    this.props.questionPreFetchSave(updatedQuestion)
  }
  //props: question
  render() {
    return (
      <div style={{border: "1px solid black"}}>
        <Question
          question={this.props.question}
          updateOption={this.updateOption.bind(this)}
          handleOnChange={this.handleOnChange.bind(this)}
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
    questionFetchInProgress: question => {dispatch(questionFetchInProgress(question))},
    questionPreFetchSave: question => {dispatch(questionPreFetchSave(question))}
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QuestionContainer);
