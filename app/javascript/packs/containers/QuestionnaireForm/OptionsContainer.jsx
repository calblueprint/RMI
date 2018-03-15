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
import {connect} from 'react-redux';
import {patch, post} from '../../fetch/requester';
import {generateTempId} from '../../utils/TempIdUtil';
import PropTypes from 'prop-types';

class OptionsContainer extends React.Component {

  /**
   * Returns the correct questionnaire form option component given quesiton type
   * @param { string } questionType - question.question_type
   * @returns react component
   */
  getComponentName(questionType) {
    switch (questionType) {
      case "dropdown": return DropdownOption;
      case "range": return RangeOption;
      default: return
    }
  }

  handleOnBlur(option) {
    if (option.temp) {
      return this.createOption;
    }
    return this.updateOption;
  }

  optionUrl() {
    if (this.props.question.question_type === 'range') {
      return '/api/range_options';
    } else if (this.props.question.question_type === 'dropdown') {
      return '/api/dropdown_options';
    } else {
      return
    }
  }

  /**
   * Function handling fetch request to post an option and redux update
   * @param { string } id - optionId to update
   * @param { Object } args - any option parameters
   */
  async createOption(id, args) {
    const newOption = {...this.props.question.options[id], ...args};
    const tempOption = this.props.question.options[id];
    this.props.optionFetchInProgress(newOption);
    const optionKey = this.props.question.question_type;
    try {
      let response = await post(this.optionUrl(), { [optionKey + '_option']: newOption });
      this.props.optionFetchSuccess(response.data);
      this.props.removeOption(tempOption);
    } catch (error) {
      this.props.optionFetchFailure(error);
    }
  }

  /**
   * Function handling fetch request to update an option and redux update
   * @param { string } id - optionId to update
   * @param { Object } args - any option parameters
   */
  async updateOption(id, args) {
    const updatedOption = {...this.props.question.options[id], ...args};
    this.props.optionFetchInProgress(updatedOption);
    const optionKey = this.props.question.question_type;
    try {
      let response = await patch(this.optionUrl() + '/' + updatedOption.id,
        {[optionKey + '_option']: updatedOption});
      this.props.optionFetchSuccess(response.data);
    } catch (error) {
      this.props.optionFetchFailure(error);
    }
  }



  /**
   * Handles event for onChange which is updating redux temporarily.
   * If create new option, create a temp option in question redux.
   * @param { string } id - optionId that is updating
   * @param { string } args - any option parameters
   */
  handleOnChange(id, args) {
    const updatedOption = {...this.props.question.options[id], ...args};
    this.props.optionPreFetchSave(updatedOption);
  }

  /**
   * If focusing on option input to create new option, create a temp option in question
   * @param id
   * @param args
   */
  onNewOption() {
    const newtempOption = {
      id: generateTempId(),
      question_id: this.props.question.id
    };
    if (this.props.question.question_type) {

    }
    this.props.beforeCreateNewOption(newtempOption);
  }

  newOptionPlaceholder () {
    switch (this.props.question.question_type) {
      case "dropdown":
        return(
          <div>
            <input
              type="text"
              placeholder={"Add new dropdown option"}
              onFocus={e => this.onNewOption()}
            />
          </div>
        );
      case "range":
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
    const ComponentName = this.getComponentName(question.question_type);

    const optionsDisplay = Object.keys(this.props.question.options).map((optionId) => {
      const option = this.props.question.options[optionId];
      const handleOnBlur = this.handleOnBlur(option);
      const focus = option.temp || false;
      return (
        <div key={optionId}>
          <ComponentName
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
    optionFetchInProgress: option => {dispatch(optionFetchInProgress(option))},
    optionPreFetchSave: option => {dispatch(optionPreFetchSave(option))},
    beforeCreateNewOption: option => {dispatch(beforeCreateNewOption(option))},
    optionFetchSuccess: response => {dispatch(optionFetchSuccess(response))},
    removeOption: option => {dispatch(removeOption(option))},
    optionFetchFailure: response => {dispatch(optionFetchFailure(response))}
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OptionsContainer);


OptionsContainer.propTypes = {
  question: PropTypes.object.isRequired,
};
