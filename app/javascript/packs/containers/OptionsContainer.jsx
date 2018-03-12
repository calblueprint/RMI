import React from 'react';
import PropTypes from 'prop-types';
import QuestionContainer from './QuestionContainer';
import DropdownOption from '../components/DropdownOption';
import RangeOption from '../components/RangeOption';
import FileOption from '../components/FileOption';
import FreeOption from '../components/FreeOption';
import Status from '../components/Status';

import { connect } from 'react-redux';
import { getAnswerForQuestionAndBuilding } from '../selectors/answersSelector';
import { getDependentQuestionsForOptions } from '../selectors/questionsSelector';
import { createAnswer, updateAnswer, updateLocalAnswer } from '../actions/answers';


class OptionsContainer extends React.Component {
  /**
   * Callback for when an answer field has been modified in any way.
   *
   * @param option_id   id of the selected option
   * @param value       The data of the updated answer. For range options, this is the number the user inputted;
   *                      for dropdown options, it's the text of the option that was selected.
   */
  onChange(option_id, value) {
    // Set up answer data to send in action and fetch request
    const answer = getAnswerData(option_id, value);
    this.props.updateLocalAnswer(this.props.building_id, answer);
  }

  /**
   * Callback for when the answer should be saved remotely.
   * Some answer components (such as FreeOption) may debounce this, while others (like DropdownOption) don't need to.
   *
   * @param option_id   id of the selected option
   * @param value       The data of the updated answer. For range options, this is the number the user inputted;
   *                      for dropdown options, it's the text of the option that was selected.
   */
  onSave(option_id, value) {
    const answer = getAnswerData(option_id, value);

    // Dispatch an action to update answer in the database and in store
    if (!this.props.answer) {
      this.props.createAnswer(answer.building_id, answer);
    }
    else {
      answer.id = this.props.answer.id;
      this.props.updateAnswer(answer.building_id, answer);
    }
  }

  /**
   * Called when the user clicks the "retry" button. Will attempt to save
   * the answer again if it previously failed due to connection issues.
   */
  onRetry() {
    const answer = this.props.answer;
    if (answer) {
      this.onSave(answer.selected_option_id, answer.text);
    }
  }

  /**
   * Returns answer data in the form expected for a fetch request.
   */
  getAnswerData(option_id, value) {
    return {
      building_id: this.props.building_id,
      question_id: this.props.question_id,
      selected_option_id: option_id,
      text: value
    };
  }

  render() {
    const optionProps = {
      options: this.props.options,
      answer: this.props.answer,
      onChange: this.onChange.bind(this),
      onSave: this.onSave.bind(this)
    };
    const optionsComponent = (() => {
      switch (this.props.question_type) {
        case "dropdown":
          return <DropdownOption {...optionProps} />;
        case "range":
          return <RangeOption {...optionProps} />;
        case "file":
          return <FileOption {...optionProps} />;
        default:
          return <FreeOption {...optionProps} />;
      }
    })();
    const dependentQuestions = (() => {
      if (this.props.answer) {
        const dependents = this.props.dependentQuestions[this.props.answer.selected_option_id];
        if (dependents) {
          return dependents.map(question => {
            return (<div key={question.id}>
              <QuestionContainer mode="answer"
                   building_id={this.props.building_id} {...question} />
            </div>);
          });
        }
      }
    })();

    return (<div>
      {optionsComponent}
      <Status fetchObject={this.props.answer}
              onRetry={this.onRetry.bind(this)} />
      {dependentQuestions}
    </div>)
  }
}

function mapStateToProps(state, ownProps) {
  return {
    answer: getAnswerForQuestionAndBuilding(ownProps.question_id, ownProps.building_id, state),
    dependentQuestions: getDependentQuestionsForOptions(ownProps.options, ownProps.question_type, state)
  }
}

function mapDispatchToProps(dispatch) {
  return {
    createAnswer: debounce(function (buildingId, answer) {
      return createAnswer(buildingId, answer, dispatch);
    }, 3000),
    updateAnswer: debounce(function (buildingId, answer) {
      return updateAnswer(buildingId, answer, dispatch);
    }, 3000),
    updateLocalAnswer: (buildingId, answer) => dispatch(updateLocalAnswer(buildingId, answer))
  }
}

OptionsContainer.propTypes = {
  question_id: PropTypes.number.isRequired,
  building_id: PropTypes.number.isRequired,
  question_type: PropTypes.string.isRequired,
  options: PropTypes.object.isRequired,
  dependentQuestions: PropTypes.object.isRequired,
  answer: PropTypes.shape({ // Optional - new questions can have no answer

  })
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OptionsContainer);
