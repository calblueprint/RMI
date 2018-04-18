import React from 'react';
import DropdownOption from '../../components/QuestionnaireForm/DropdownOption';
import RangeOption from '../../components/QuestionnaireForm/RangeOption';
import {
  optionFetchInProgress,
  optionPreFetchSave,
  beforeCreateNewOption,
  optionFetchSuccess,
  optionFetchFailure,
  removeOption
} from '../../actions/options';
import { connect } from 'react-redux';
import { patch, post } from '../../fetch/requester';
import { generateTempId } from '../../utils/TemporaryObjectUtil';
import PropTypes from 'prop-types';
import { isEmptyText } from '../../utils/InputComponentUtil';

class OptionsContainer extends React.Component {

  /**
   * Returns the correct Components/QuestionnaireForm/<option> component given question type
   * @param { string } questionType - question.question_type
   * @returns react component
   */
  getComponentName(questionType) {
    switch (questionType) {
      case "DropdownOption": return DropdownOption;
      case "RangeOption": return RangeOption;
      default: return
    }
  }

  /**
   * Passes async fetch function into option container to handle onBlur event.
   * @param {object} option - option object
   * @returns {function} async fetch
   */
  handleOnBlur(option) {
    if (option.temp) {
      return this.createOption;
    }
    return this.updateOption;
  }

  /**
   * Returns the url constant for range options or dropdown options.
   * @returns {string} url pattern for range or dropdown option.
   */
  optionUrl() {
    if (this.props.question.question_type === 'RangeOption') {
      return '/api/range_options';
    } else if (this.props.question.question_type === 'DropdownOption') {
      return '/api/dropdown_options';
    } else {
      return
    }
  }

  /**
   * Returns the option key required by strong params in rails controller
   * @returns {string} option key
   */
  optionKey() {
    switch (this.props.question.question_type) {
      case "RangeOption": return 'range_option';
      case "DropdownOption": return 'dropdown_option';
      default: return null;
    }
  }

  /**
   * Handles fetch request to post an option and redux update
   * @param { string } id - optionId to update
   * @param { Object } args - any option parameters
   */
  async createOption(id, args) {
    const newOption = {...this.props.question.options[id], ...args};
    const tempOption = this.props.question.options[id];
    this.props.optionFetchInProgress(newOption);

    try {
      let response = await post(this.optionUrl(), { [this.optionKey()]: newOption });
      this.props.optionFetchSuccess(response.data);
      this.props.removeOption(tempOption);
    } catch (error) {
      this.props.optionFetchFailure(error, newOption);
    }
  }

  /**
   * Handles fetch request to update an option and redux update
   * @param { string } id - optionId to update
   * @param { Object } args - any option parameters
   */
  async updateOption(id, args) {
    const updatedOption = {...this.props.question.options[id], ...args};
    this.props.optionFetchInProgress(updatedOption);
    try {
      let response = await patch(this.optionUrl() + '/' + updatedOption.id,
        {[this.optionKey()]: updatedOption});
      this.props.optionFetchSuccess(response.data);
    } catch (error) {
      this.props.optionFetchFailure(error, updatedOption);
    }
  }

  /**
   * Handles event for onChange which is updating redux temporarily.
   * If create new option, create a temp option in question store.
   * @param { string } id - optionId that is updating
   * @param { string } args - any option parameters
   */
  handleOnChange(id, args) {
    const updatedOption = {...this.props.question.options[id], ...args};
    this.props.optionPreFetchSave(updatedOption);
  }

  /**
   * Handles onFocus for new option input to create a temp option for question
   * Creates a new temp option in store
   */
  onNewOption() {
    const newtempOption = {
      id: generateTempId(),
      question_id: this.props.question.id
    };
    this.props.beforeCreateNewOption(newtempOption);
  }

  /**
   * Returns an input box that when clicked, creates a new temp range or dropdown option
   * @returns {html} input box that triggers a new temp option when focused.
   */
  newOptionPlaceholder () {
    switch (this.props.question.question_type) {
      case "DropdownOption":
        return(
          <div>
            <input
              type="text"
              placeholder={"Add new dropdown option"}
              onFocus={e => this.onNewOption()}
            />
          </div>
        );
      case "RangeOption":
        return(
          <div>
            min:
            <input
              type="number"
              placeholder={"Add new min"}
              onFocus={e => this.onNewOption()}
            />
            max:
            <input
              type="number"
              placeholder={"Add new max"}
              onFocus={e => this.onNewOption()}
            />
          </div>
        );
      default: return null;
    }
  }

  render () {
    const question = this.props.question;
    const OptionType = this.getComponentName(question.question_type);

    const optionsDisplay = Object.keys(this.props.question.options).map((optionId) => {
      const option = this.props.question.options[optionId];
      const handleOnBlur = this.handleOnBlur(option);
      const focus = option.temp || false;
      return (
        <div key={optionId}>
          <OptionType
            option={option}
            handleOnBlur={handleOnBlur.bind(this)}
            handleOnChange={this.handleOnChange.bind(this)}
            focus={focus}
          />
        </div>
      )
    });

    return(
      <div>
        {optionsDisplay}
        <button
          onClick={(e) => this.onNewOption()}
        >
          + Add
        </button>
      </div>
    )
  }

}

function mapStateToProps(state, ownProps) {
  return {
  };
}

function mapDispatchToProps(dispatch) {
  return {
    optionFetchInProgress: (option) => {dispatch(optionFetchInProgress(option))},
    optionPreFetchSave: (option) => {dispatch(optionPreFetchSave(option))},
    beforeCreateNewOption: (option) => {dispatch(beforeCreateNewOption(option))},
    optionFetchSuccess: (response) => {dispatch(optionFetchSuccess(response))},
    removeOption: (option) => {dispatch(removeOption(option))},
    optionFetchFailure: (error, option) => {dispatch(optionFetchFailure(error, option))}
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OptionsContainer);


OptionsContainer.propTypes = {
  question: PropTypes.object.isRequired,
};
