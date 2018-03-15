import React from 'react';
import PropTypes from 'prop-types';

class RangeOption extends React.Component {
  componentDidMount(){
    if (this.props.focus) {
      this.optionInput.focus();
    }
  }

  /**
   * Validates min <= max before triggering fetch request onBlur
   * @param { string } rawNum - the raw text input value for min
   */
  checkMin(rawNum) {
    const num = parseInt(rawNum);
    if (num && num <= this.props.option.max) {
      //trigger fetch function
      this.props.handleOnBlur(this.props.option.id, {min: num});
    }
  }

  /**
   * Validates max >= min before triggering fetch request onBlur
   * @param { string } rawNum - the raw text input value for max
   */
  checkMax (rawNum) {
    const num = parseInt(rawNum);
    if (num && num >= this.props.option.min) {
      //trigger fetch function
      this.props.handleOnBlur(this.props.option.id, {max: num})
    }
  }

  /**
   * Handles event for onChange which stores min value in redux temporarily
   * @param { string } rawNum - the raw text input value for min
   */
  tempUpdateMin (rawNum) {
    const num = parseInt(rawNum);
    this.props.handleOnChange(this.props.option.id, {min: num})
  }

  /**
   * Handles event for onChange which stores max value in redux temporarily
   * @param { string } rawNum - the raw text input value for max
   */
  tempUpdateMax (rawNum) {
    const num = parseInt(rawNum);
    this.props.handleOnChange(this.props.option.id, {max: num})
  }


  render() {
    return(
      <div>
        min:
        <input
          type="number"
          defaultValue={this.props.option.min}
          onBlur={(e) => this.checkMin(e.target.value)}
          onChange={(e) => this.tempUpdateMin(e.target.value)}
          placeholder={0}
          ref={(input) => { this.optionInput = input; }}
        />
        max:
        <input
          type="number"
          defaultValue={this.props.option.max}
          onBlur={(e) => this.checkMax(e.target.value)}
          onChange={(e) => this.tempUpdateMax(e.target.value)}
          placeholder={100}
        />
      </div>
    );
  }

}

export default RangeOption

RangeOption.propTypes = {
  option: PropTypes.object.isRequired,
  handleOnBlur: PropTypes.func.isRequired,
  handleOnChange: PropTypes.func.isRequired,
  focus: PropTypes.bool.isRequired
};
