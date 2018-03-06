import React from 'react';
import DropdownOption from '../../components/QuestionnaireForm/DropdownOption';
import RangeOption from '../../components/QuestionnaireForm/RangeOption';
import {
  optionFetchInProgress,
  optionPreFetchSave
} from '../../actions/questions';
import {connect} from 'react-redux';

class OptionsContainer extends React.Component {
  getComponentName(questionType) {
    switch (questionType) {
      case "dropdown": return DropdownOption;
      case "range": return RangeOption;
      default: return
    }
  }

  updateOption(id, args) {
    const updated_option = {...this.props.question.options[id], ...args}
    this.props.optionFetchInProgress(updated_option)
  }

  handleOnChange(id, args) {
    const updated_option = {...this.props.question.options[id], ...args}
    this.props.optionPreFetchSave(updated_option)
  }

  render () {
    const question = this.props.question;
    const ComponentName = this.getComponentName(question.question_type);

    const options_display = Object.keys(this.props.question.options).map((optionId) => {
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
        {options_display}
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



