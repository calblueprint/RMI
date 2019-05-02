import React from "react";
import PropTypes from "prop-types";
import FAIcon from "../FAIcon";
import downIcon from "@fortawesome/fontawesome-free-solid/faCaretDown";

class OptionDisplay extends React.Component {
  render() {
    const option = this.props.option;

    switch (this.props.question.question_type) {
      case "RangeOption": {
        return (
          <div className="dep-option-display-block">
            <FAIcon iconObj={downIcon} />
            <div>If the user selects</div>
            <div className="selected-option">
              {option.min} - {option.max}
            </div>
          </div>
        );
      }
      case "DropdownOption": {
        return (
          <div className="dep-option-display-block">
            <FAIcon iconObj={downIcon} />
            <p>If the user selects</p>
            <div className="selected-option">{option.text}</div>
          </div>
        );
      }
      default: {
        return <div />;
      }
    }
  }
}

export default OptionDisplay;

OptionDisplay.propTypes = {
  option: PropTypes.object.isRequired,
  question: PropTypes.object.isRequired
};
