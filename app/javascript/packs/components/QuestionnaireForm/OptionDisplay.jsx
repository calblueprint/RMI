import React from 'react';
import PropTypes from 'prop-types'

class OptionDisplay extends React.Component {
  render() {
    const option = this.props.option;
    switch (this.props.question.question_type) {
      case "RangeOption": {
        return(
          <div className={'dep-option-display-block'}>
            <div>
              Selected
            </div>
            <div
              className={'selected-option'}
            >
              {option.min} - {option.max}
            </div>
          </div>
        )
      }
      case "DropdownOption": {
        return(
          <div className={'dep-option-display-block'}>
            <p>
              Selected
            </p>
            <div
              className={'selected-option'}
            >
              {option.text}
            </div>
          </div>
        )
      }
      default: {
        return(<div></div>)
      }
    }
  }
}

export default OptionDisplay;

OptionDisplay.propTypes = {
  option: PropTypes.object.isRequired,
  question: PropTypes.object.isRequired
};
