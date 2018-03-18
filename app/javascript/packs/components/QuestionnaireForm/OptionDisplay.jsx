import React from 'react';
import PropTypes from 'prop-types'

class OptionDisplay extends React.Component {
  render() {
    const option = this.props.option;
    switch (this.props.question.question_type) {
      case "RangeOption": {
        return(
          <div>
            <p>
              min: {option.min} max:{option.max}
            </p>
          </div>
        )
      }
      case "DropdownOption": {
        return(
          <div>
            <p>
              {option.text}
            </p>
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
