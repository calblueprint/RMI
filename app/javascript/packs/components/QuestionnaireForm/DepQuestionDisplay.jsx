import React from 'react';
import PropTypes from 'prop-types';
import QuestionContainer from '../../containers/QuestionnaireForm/QuestionContainer';
import OptionDisplay from './OptionDisplay';

class DepQuestionDisplay extends React.Component {
  render() {
    const option = this.props.option;
    const optionId = option.id
    const DepQForOptionList = this.props.depQuestionsForOptions[optionId];
    const questionsDisplay = DepQForOptionList.map((depQ) => {
      return (
        <div key={depQ.id}>
          <QuestionContainer
            question={depQ}
          />
        </div>
      )}
    );

    return(
      <div
        className={'dep-question-block'}
        key={optionId}>
        <OptionDisplay
          option={option}
          question={this.props.question}
        />
        <div>
          {questionsDisplay}
        </div>
      </div>
    )
  }
}

export default DepQuestionDisplay;

DepQuestionDisplay.propTypes = {
  depQuestionsForOptions: PropTypes.object.isRequired,
  question: PropTypes.object.isRequired,
  option: PropTypes.object.isRequired
};
