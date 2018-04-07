import React from 'react';
import PropTypes from 'prop-types';
import InputValidation from '../InputValidation';

class RangeOption extends React.Component {
  componentDidMount(){
    if (this.props.focus) {
      this.optionInput.focus();
    }
  }

  /**
   * Handles event for onChange which stores min/max value in redux temporarily
   * @param { Object } args - attributes of the range option to update
   *
   */
  tempUpdate (args) {
    this.props.handleOnChange(this.props.option.id, args)
  }

  /**
   * Handles fetch request onBlur for min/max
   * @param { Object } args - attributes of the range option to update
   */
  updateMinMax(args) {
    if (this.props.option.min && this.props.option.max) {
      this.props.handleOnBlur(this.props.option.id, args)
    }
  }

  /**
   * Handles fetch request onBlur for units
   * @param { Object } args - attributes of units to update
   */
  updateUnit(args) {
    this.props.handleOnBlur(this.props.option.id, args)
  }

  render() {
    return(
      <div>
        <div>
          min:
          <input
            type="number"
            defaultValue={this.props.option.min}
            onBlur={(e) => this.updateMinMax({min: parseInt(e.target.value)})}
            onChange={(e) => this.tempUpdateMinMax({min: parseInt(e.target.value)})}
            placeholder={0}
            ref={(input) => { this.optionInput = input; }}
          />
          max:
          <input
            type="number"
            defaultValue={this.props.option.max}
            onBlur={(e) => this.updateMinMax({max: parseInt(e.target.value)})}
            onChange={(e) => this.tempUpdate({max: parseInt(e.target.value)})}
            placeholder={100}
          />
          unit:
          <input
            defaultValue={this.props.option.unit}
            placeholder={'Feet'}
            onBlur={(e) => this.updateUnit({unit: e.target.value})}
            onChange={(e) => this.tempUpdate({unit: e.target.value})}
          />
        </div>
        <div>
          <InputValidation
            errors={this.props.option.error}
          />
        </div>
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
