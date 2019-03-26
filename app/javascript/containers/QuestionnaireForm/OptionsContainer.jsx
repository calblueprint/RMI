import React from 'react';
import DropdownOption from '../../components/QuestionnaireForm/DropdownOption';
import RangeOption from '../../components/QuestionnaireForm/RangeOption';
import {
  optionFetchInProgress,
  optionPreFetchSave,
  beforeCreateNewOption,
  optionFetchSuccess,
  optionFetchFailure,
  optionDeleteSuccess,
  optionDeleteFailure,
  optionDeleteInProgress,
  removeOption,
  detachOptionFromQuestion
} from '../../actions/options';
import { connect } from 'react-redux';
import { patch, post, destroy } from '../../fetch/requester';
import { generateTempId } from '../../utils/TemporaryObjectUtil';
import PropTypes from 'prop-types';
import { isEmptyText } from '../../utils/InputComponentUtil';
import randomColor from 'randomcolor';

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
   * Handles fetch request to delete an option and redux update
   * @param { string } id - optionId to update
   * @param { Object } args - any option parameters
   */
  async removeOption(id, args) {
    const removedOption = {...this.props.question.options[id], ...args};
    this.props.optionDeleteInProgress(removedOption);
    try {
      let response = await destroy(this.optionUrl() + '/' + removedOption.id);
      this.props.optionDeleteSuccess(removedOption);
      this.props.removeOption(removedOption);
    } catch (error) {
      this.props.optionDeleteFailure(error, removedOption);
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
   * Handles event for onRemove which calls async removeOption
   * If create new option, create a temp option in question store.
   * @param { string } id - optionId that is to be removed
   * @param { string } args - any option parameters
   */
  handleOnRemove(id, args) {
    var confirmDeletion = confirm("Are you sure you want to delete this option (and all dependent questions)?");
    if (confirmDeletion) {
      this.removeOption(id, args);
      // this.props.handleOnRemove(this.props.category.id, { name })
    }
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
          <div
            className={'option-display-block__counter'}
          >
            <div
              className={'dropdown-input'}
              onClick={e => this.onNewOption()}
              style={{color: 'gray'}}
            >
              Add new dropdown option
            </div>
          </div>
        );
      case "RangeOption":
        return(
          <button
            className={'add-option'}
            onClick={e => this.onNewOption()}
          >
            +Add
          </button>
        );
      default: return null;
    }
  }

  deleteOptionButton (optionId) {
    if (!this.props.question.options[optionId]["temp"]) {
      return (
        <button
          className="btn btn--primary remove_option_btn"
          onClick={(e) => this.handleOnRemove(optionId, e.target.value)}>
          x
        </button>
      )
    }
  }

  render () {
    const question = this.props.question;
    const OptionType = this.getComponentName(question.question_type);

    const OptionsDisplay = Object.keys(this.props.question.options).map((optionId) => {
      const option = this.props.question.options[optionId];
      const handleOnBlur = this.handleOnBlur(option);
      const focus = option.temp || false;
      const color = randomColor({
        luminosity: 'light',
        hue:  'random',
        seed: option.id,
        format: 'rgba',
        alpha: 0.5
      });
      if (option['deleted']) {
        return (<div></div>)
      } else {
        return (
          <div key={option.id}
          >
            <div className={'option_input_row'}>
              <div className={'option_input'}>
                <OptionType
                  key={option.id}
                  option={option}
                  handleOnBlur={handleOnBlur.bind(this)}
                  handleOnChange={this.handleOnChange.bind(this)}
                  focus={focus}
                />
              </div>
              {this.deleteOptionButton(option.id)}
            </div>
          </div>
        )
      }
    });

    return(
      <div
        className={'option-display-block'}
      >
        {OptionsDisplay}
        {this.newOptionPlaceholder()}
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
    optionFetchFailure: (error, option) => {dispatch(optionFetchFailure(error, option))},
    optionDeleteInProgress: option => { dispatch(optionDeleteInProgress(option)) },
    optionDeleteSuccess: option => { dispatch(optionDeleteSuccess(option)) },
    optionDeleteFailure: (error, option) => { dispatch(optionDeleteFailure(error, option)) },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OptionsContainer);


OptionsContainer.propTypes = {
  question: PropTypes.object.isRequired,
};
