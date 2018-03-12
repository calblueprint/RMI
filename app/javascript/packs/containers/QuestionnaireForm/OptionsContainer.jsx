import React from 'react';
import DropdownOption from '../../components/QuestionnaireForm/DropdownOption';
import RangeOption from '../../components/QuestionnaireForm/RangeOption';
import {
  optionFetchInProgress,
  optionPreFetchSave
} from '../../actions/options';
import {connect} from 'react-redux';

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

  /**
   * Function handling fetch request to update an option and redux update
   * @param { string } id - optionId to update
   * @param { Object } args - any option parameters
   */
  updateOption(id, args) {
    const updatedOption = {...this.props.question.options[id], ...args}
    this.props.optionFetchInProgress(updatedOption)
  }

  /**
   * Handles event for onChange which is updating redux temporarily
   * @param { string } id - optionId that is updating
   * @param { string } args - any option parameters
   */
  handleOnChange(id, args) {
    const updatedOption = {...this.props.question.options[id], ...args}
    this.props.optionPreFetchSave(updatedOption)
  }

  render () {
    const question = this.props.question;
    const ComponentName = this.getComponentName(question.question_type);

    const optionsDisplay = Object.keys(this.props.question.options).map((optionId) => {
      const option = this.props.question.options[optionId];
      return (
        <div key={optionId}>
          <ComponentName
            option={option}
            updateOption={this.updateOption.bind(this)}
            handleOnChange={this.handleOnChange.bind(this)}
          />
        </div>
      )
    })

    return(
      <div>
        {optionsDisplay}
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
    optionPreFetchSave: option => {dispatch(optionPreFetchSave(option))}
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OptionsContainer);



