import React from 'react';
import PropTypes from 'prop-types';
import QuestionContainer from '../../containers/QuestionnaireForm/QuestionContainer';
import OptionDisplay from './OptionDisplay';
import CreateQuestionButton from './CreateQuestionButton';
import {newDefaultQuestion} from '../../utils/TemporaryObjectUtil';

class DepQuestionDisplay extends React.Component {

  displayQuestions() {
    const DepQForOptionList = this.props.depQuestionsForOptions[this.props.option.id];
    if (!!DepQForOptionList) {
      const questionList = DepQForOptionList.map((depQ) => {
        return (
          <div key={depQ.id}>
            <QuestionContainer
              question={depQ}
            />
          </div>
        )}
      );

      return (
        <div className={'dep-q-block__selected'}>
          {questionList}
        </div>
      )
    } else {
      return null;
    }
  }

  newTempQuestion() {
    const args = {
      building_type_id: this.props.question.building_type_id,
      category_id: this.props.question.category_id,
      parent_option_id: this.props.option.id,
      parent_option_type: this.props.question.question_type
    };
    return newDefaultQuestion(args)
  }

  render() {
    return(
      <div
        className={'dep-q-block__option'}
        key={this.props.option.id}
      >
        <div
          className={'dep-q-block__option-display'}
        >
          <div>
            <OptionDisplay
              option={this.props.option}
              question={this.props.question}
            />
          </div>
          <div>
            <CreateQuestionButton
              tempQuestion={this.newTempQuestion()}
              questionFetchSuccess={this.props.questionFetchSuccess}
              questionFetchFailure={this.props.questionFetchFailure}
              questionSetNew={this.props.questionSetNew}
              questionFetchInProgress={this.props.questionFetchInProgress}
            />
          </div>
        </div>
        {this.displayQuestions()}
      </div>
    )
  }
}

export default DepQuestionDisplay;

DepQuestionDisplay.propTypes = {
  depQuestionsForOptions: PropTypes.object.isRequired,
  question: PropTypes.object.isRequired,
  option: PropTypes.object.isRequired,
  questionFetchSuccess: PropTypes.func.isRequired,
  questionFetchFailure: PropTypes.func.isRequired,
  questionSetNew: PropTypes.func.isRequired,
  questionFetchInProgress: PropTypes.func.isRequired,
};
