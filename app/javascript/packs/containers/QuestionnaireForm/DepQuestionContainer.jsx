import React from 'react';
import { connect } from 'react-redux';
import Question from '../../components/QuestionnaireForm/Question';
import {getDependentQuestionsForOptions, getQuestionsByBuildingType} from '../../selectors/questionsSelector';

class DepQuestionContainer extends React.Component {
  render() {
    const options = this.props.question.options;
    return (
      <div style={{marginLeft: 50}}>
        {Object.keys(this.props.options_questions).map((id) => {

          const option = this.props.options_questions[id];
          const questions = option.map((question) => {
            return (
              <div key={question.id}>
                <Question
                  question={question}
                />
              </div>
            )}
          );
          return(
            <div key={id}>
              <p> {option.text} </p>
              <div style={{marginLeft: 50}}>
                {questions}
              </div>
            </div>

          )}
        )}

      </div>);
  }
}

function mapStateToProps(state, ownProps) {
  return {
    options_questions: getDependentQuestionsForOptions(ownProps.optionsList, ownProps.question.question_type, state)
  };
}

function mapDispatchToProps(dispatch) {
  return {
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DepQuestionContainer);
