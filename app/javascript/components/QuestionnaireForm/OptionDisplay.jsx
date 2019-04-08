import React from 'react';
import PropTypes from 'prop-types';
import randomColor from 'randomcolor';

class OptionDisplay extends React.Component {
  getSelectedOptionDiv(question_type, option) {
    const color = randomColor({
      luminosity: 'light',
      hue:  'random',
      seed: JSON.stringify(option),
      format: 'rgba',
      alpha: 0.8
    });
    const text = (() => {
      if (question_type == "RangeOption") {
        return option.min + " - " + option.max;
      }
      else if (question_type == "DropdownOption") {
        return option.text;
      }
      else {
        return "UNKNOWN OPTION!"
      }
    })();

    return(
      <div className={'dep-option-display-block'}>
        <div>
          Selected
        </div>
        <div
          className={'selected-option'}
          style={{ backgroundColor: color }}
        >
          {text}
        </div>
      </div>
    )
  }

  render() {
    const option = this.props.option;


    switch (this.props.question.question_type) {
      case "RangeOption":
      case "DropdownOption": {
        return this.getSelectedOptionDiv(this.props.question.question_type, option);
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
