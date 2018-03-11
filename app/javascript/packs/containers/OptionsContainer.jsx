import React from 'react';

import Transition from 'react-transition-group/Transition';

import PropTypes from 'prop-types';
import QuestionContainer from './QuestionContainer';
import DropdownOption from '../components/DropdownOption';
import RangeOption from '../components/RangeOption';
import FileOption from '../components/FileOption';
import FreeOption from '../components/FreeOption';
import Status from '../components/Status';

import { connect } from 'react-redux';
import { getAnswerForQuestionAndBuilding } from '../selectors/answersSelector';
import { getDependentQuestionsForOptionIds } from '../selectors/questionsSelector';
import { createAnswer, updateAnswer, updateLocalAnswer } from '../actions/answers';

const styles = {
  transition: 'all 0.4s cubic-bezier(1, 0, 0, 1)',
  overflowY: 'hidden'
};

const transitionStyles = {
  entering: {
    maxHeight: 0,
    transform: 'translateX(-20px)',
    marginLeft: 0,
    opacity: 0
  },
  entered: {
    maxHeight: 800,
    marginLeft: 20,
    opacity: 1
  },
  exiting: {
    maxHeight: 800,
    opacity: 1
  },
  exited: {
    maxHeight: 0,
    marginLeft: 0,
    opacity: 0
  }
};

class OptionsContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: false
    };

    this.focusFirstDependent = () => console.warn('No');
  }
  /**
   * Returns answer data in the format expected for a fetch request.
   */
  getAnswerData(optionId, value) {
    return {
      ...this.props.answer,
      building_id: this.props.building_id,
      question_id: this.props.question_id,
      selected_option_id: optionId,
      text: value
    };
  }

  /**
   * Callback for when an answer field has been modified in any way.
   * Answer will be updated in store.
   *
   * @param optionId    id of the selected option
   * @param value       The data of the updated answer. For range options, this is the number the user inputted;
   *                      for dropdown options, it's the text of the option that was selected.
   */
  onChange(optionId, value) {
    const answer = this.getAnswerData(optionId, value);
    this.props.updateLocalAnswer(this.props.building_id, answer);
  }

  /**
   * Callback for when the answer should be saved remotely.
   * Some answer components (such as FreeOption) may debounce this, while others (like DropdownOption) don't need to.
   *
   * @param optionId    id of the selected option
   * @param value       The data of the updated answer. For range options, this is the number the user inputted;
   *                      for dropdown options, it's the text of the option that was selected.
   */
  onSave(optionId, value) {
    const answer = this.getAnswerData(optionId, value);

    // Dispatch an action to update answer in the database and in store
    if (!this.props.answer || !this.props.answer.id) {
      this.props.createAnswer(answer.building_id, answer);
    }
    else {
      answer.id = this.props.answer.id;
      this.props.updateAnswer(answer.building_id, answer);
    }

    setTimeout(() => this.focusFirstDependent(), 500);
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

  render() {
    const optionProps = {
      options: this.props.options,
      answer: this.props.answer,
      onChange: this.onChange.bind(this),
      onSave: this.onSave.bind(this)
      onEnter: () => this.setState({ selected: true }),
      onLeave: () => this.setState({ selected: false }),
      setFocusFunc: this.props.setFocusFunc
    };
    const optionsComponent = (() => {
      switch (this.props.question_type) {
        case "DropdownOption":
          return <DropdownOption {...optionProps} />;
        case "RangeOption":
          return <RangeOption {...optionProps} />;
        case "file":
          return <FileOption {...optionProps} />;
        default:
          return <FreeOption {...optionProps} />;
      }
    })();
    const dependentQuestions = (() => {
      if (!this.props.answer) return null;
      const { dependentQuestions, answer } = this.props;

      const dependentOptionIds = Object.keys(dependentQuestions);
      const allDependentQuestions = dependentOptionIds.reduce((arr, key) => {
        const questions = dependentQuestions[key];
        return arr.concat(questions);
      }, []);
      const selectedOption = answer.selected_option_id;

      const shownDependents = dependentQuestions[selectedOption];
      const firstShownDependent = shownDependents.length > 0
          ? shownDependents[0]
          : null;

      return allDependentQuestions.map((question, i) => {
        let focus;
        if (firstShownDependent) {
          focus = question.id === firstShownDependent.id ? {
            setFocusFunc: (focusFunc) => {
              this.focusFirstDependent = focusFunc;
            }
          } : {};
        }
        return (
          <Transition
            in={question.parent_option_id === selectedOption}
            timeout={0}
          >
            {(state) => (
              <div
                key={question.id}
                style={{...styles, ...transitionStyles[state]}}
              >
                <OptionsContainer
                  building_id={this.props.building_id}
                  question_id={question.id}
                  {...question}
                  {...focus}
                />
              </div>
            )}
          </Transition>
        );
      });
    })();

    return (<div class="question__block">
      <Status fetchObject={this.props.answer}
              onRetry={this.onRetry.bind(this)} />
      <div
        className={`question ${this.state.selected ? 'question--selected' : ''}`}
      >
        <p>{this.props.text}</p>
        {optionsComponent}
      </div>
      {dependentQuestions ?
        <div className="questions__nested">
          {dependentQuestions}
        </div>
      : null}

    </div>);
  }
}

function mapStateToProps(state, ownProps) {
  return {
    answer: getAnswerForQuestionAndBuilding(ownProps.question_id, ownProps.building_id, state),
    dependentQuestions: getDependentQuestionsForOptionIds(Object.keys(ownProps.options), ownProps.question_type, state)
  }
}

function mapDispatchToProps(dispatch) {
  return {
    createAnswer: (buildingId, answer) => createAnswer(buildingId, answer, dispatch),
    updateAnswer: (buildingId, answer) => updateAnswer(buildingId, answer, dispatch),
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
