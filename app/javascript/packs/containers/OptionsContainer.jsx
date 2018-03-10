import React from 'react';
import PropTypes from 'prop-types';
import DropdownOption from '../components/DropdownOption';
import RangeOption from '../components/RangeOption';
import FileOption from '../components/FileOption';
import FreeOption from '../components/FreeOption';
import Question from '../components/Question';

import { connect } from 'react-redux';
import { getAnswerForQuestionAndBuilding } from '../selectors/answersSelector';
import { getDependentQuestionsForOptions } from '../selectors/questionsSelector';
import { createAnswer, updateAnswer } from '../actions/answers';

class OptionsContainer extends React.Component {
  /**
   * Callback for when an option has been triggered. Will update the answer in database and store.
   *
   * @param option_id   id of the selected option
   * @param value       The data of the updated answer. For range options, this is the number the user inputted;
   *                      for dropdown options, it's the text of the option that was selected.
   */
  handleSelect(option_id, value) {
    // Set up answer data to send in fetch request
    const answer = {
      building_id: this.props.building_id,
      question_id: this.props.question_id,
      selected_option_id: option_id,
      text: value
    };

    // Dispatch an action to update answer in the database and in store
    if (!this.props.answer) {
      this.props.createAnswer(answer.building_id, answer);
    }
    else {
      answer.id = this.props.answer.id;
      this.props.updateAnswer(answer.building_id, answer);
    }
  }

  render() {
    const optionProps = {
      options: this.props.options,
      answer: this.props.answer,
      onSelect: this.handleSelect.bind(this)
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
              <Question building_id={this.props.building_id} {...question} />
            </div>);
          });
        }
      }
    })();

    return (<div>
      {optionsComponent}
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
    createAnswer: function (buildingId, answer) {
      return createAnswer(buildingId, answer, dispatch);
    },
    updateAnswer: function (buildingId, answer) {
      return updateAnswer(buildingId, answer, dispatch);
    }
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
