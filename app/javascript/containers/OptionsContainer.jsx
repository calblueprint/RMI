import React from 'react';

import PropTypes from 'prop-types';
import DropdownOption from '../components/DropdownOption';
import RangeOption from '../components/RangeOption';
import FileOption from '../components/FileOption';
import FreeOption from '../components/FreeOption';
import Status from '../components/Status';
import DependentQuestions from '../components/DependentQuestions';

import { connect } from 'react-redux';
import { getAnswerForQuestionAndBuilding } from '../selectors/answersSelector';
import { getDependentQuestionsForOptionIds } from '../selectors/questionsSelector';
import { createAnswer, uploadFile, deleteFile, updateAnswer, updateLocalAnswer } from '../actions/answers';

class OptionsContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: false
    };
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
  }

  onFileUpload(file) {
    this.props.uploadFile(this.props.building_id, this.props.question_id, file);
  }

  onFileDelete(file) {
    this.props.deleteFile(this.props.building_id, this.props.answer);
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
      onSave: this.onSave.bind(this),
      onFileUpload: this.onFileUpload.bind(this),
      onFileDelete: this.onFileDelete.bind(this),
      onEnter: () => this.setState({ selected: true }),
      onLeave: () => this.setState({ selected: false }),
      focusOnMount: this.props.focusOnMount,
      editable: this.props.editableMap[this.props.question_id]
    };
    const optionsComponent = (() => {
      switch (this.props.question_type) {
        case "DropdownOption":
          return <DropdownOption {...optionProps} />;
        case "RangeOption":
          optionProps['unit'] = this.props.unit;
          return <RangeOption {...optionProps} />;
        case "FileOption":
          return <FileOption {...optionProps} />;
        default:
          return <FreeOption {...optionProps} />;
      }
    })();

    return (<div className="question__block">
      <div
        className={
          `question \
          ${this.state.selected ? 'question--selected' : '' } \
          ${this.props.answer
            && this.props.answer.error ? 'question--error' : ''}`
        }
      >
        <p>{this.props.text}</p>
        {optionsComponent}
        <Status fetchObject={this.props.answer}
                onRetry={this.onRetry.bind(this)} />
      </div>
      {this.props.answer ?
        <DependentQuestions
          answer={this.props.answer}
          dependentQuestions={this.props.dependentQuestions}
          buildingId={this.props.building_id}
          parentIsHidden={this.props.parentIsHidden}
          disableFocusOnMount={this.props.question_type == "RangeOption"}
          editableMap={this.props.editableMap}
        />
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
    uploadFile: (buildingId, questionId, file) => uploadFile(buildingId, questionId, file, dispatch),
    deleteFile: (buildingId, answer) => deleteFile(buildingId, answer, dispatch),
    downloadFile: (url, fileName) => downloadFile(url, fileName),
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

  }),
  focusOnMount: PropTypes.bool.isRequired,
  parentIsHidden: PropTypes.bool.isRequired,
  unit: PropTypes.string
};

OptionsContainer.defaultProps = {
  focusOnMount: false,
  parentIsHidden: false,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OptionsContainer);
