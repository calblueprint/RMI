import React from 'react';
import { connect } from 'react-redux';
import Question from '../../components/QuestionnaireForm/Question';
import QuestionContainer  from './QuestionContainer';
import {getDependentQuestionsForOptions, getQuestionsByBuildingType} from '../../selectors/questionsSelector';

class DepQuestionContainer extends React.Component {
  render() {
    if (Object.keys(this.props.options_to_questions).length === 0) {
      return(
        <div></div>
      )
    }
    const all_dependent_questions = Object.keys(this.props.options_to_questions).map((optionId) => {
      const displayOption = () => {
        const option = this.props.question.options[optionId];
        switch (this.props.question.question_type) {
          case "range": {
            return(
              <p>
                min: {option.min} max:{option.max}
              </p>
            )
          }
          case "dropdown": {
            return(
              <p>
                {option.text}
              </p>
            )
          }
          default:
        }
      }

      const dependent_questions_list = this.props.options_to_questions[optionId];

      const dependent_questions_display = dependent_questions_list.map((dependent_question) => {
        return (
          <div key={dependent_question.id}>
            <QuestionContainer
              question={dependent_question}
            />
          </div>
        )}
      );

      return(
        <div key={optionId}>
          {displayOption.apply(this)}
          <div>
            {dependent_questions_display}
          </div>
        </div>

      )}
    );

    return (
      <div style={{marginLeft: 50, border:"1px solid black"}}>
        <p>Dependent Questions</p>
        {all_dependent_questions}
      </div>);
  }
}

function mapStateToProps(state, ownProps) {
  return {
    options_to_questions: getDependentQuestionsForOptions(ownProps.optionsList, ownProps.question.question_type, state)
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
