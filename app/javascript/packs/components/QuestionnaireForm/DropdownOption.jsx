import React from 'react';
import PropTypes from 'prop-types';
import InputValidation from '../InputValidation';
import ContentEditable from 'react-sane-contenteditable';
import randomColor from 'randomcolor';

class DropdownOption extends React.Component {
  componentDidMount(){
    if (this.props.focus) {
      this.optionInput.focus();
    }
  }
  //props: option, updateOption, handleOnChange

  /**
   * Handles event for onBlur which is making fetch request
   * @param { string } text - the text of the dropdown option
   */
  handleOnBlur(text) {
    this.props.handleOnBlur(this.props.option.id, { text })
  }

  /**
   * Handles event for onChange which is updating redux temporarily
   * @param { string } text - the text of the dropdown option
   */
  onChange(text) {
    this.props.handleOnChange(this.props.option.id, { text })
  }

  render () {
    const color = randomColor({
      luminosity: 'light',
      hue:  'random',
      seed: this.props.option.id,
      format: 'rgba',
      alpha: 0.5
    });
    return(
      <div>
        <div
          className={'dropdown-input'}
        >
          <input
            // style={{backgroundColor: color}}

            type="text"
            defaultValue={this.props.option.text}
            onBlur={(e) => this.handleOnBlur(e.target.value)}
            onChange={(e) => this.onChange(e.target.value)}
            placeholder={"New Dropdown Option"}
            ref={(input) => { this.optionInput = input; }}
          />
        </div>

        <div>
          <InputValidation
            errors={this.props.option.error}
          />
        </div>
      </div>
    )
  }
}

export default DropdownOption

DropdownOption.propTypes = {
  option: PropTypes.object.isRequired,
  handleOnBlur: PropTypes.func.isRequired,
  handleOnChange: PropTypes.func.isRequired,
  focus: PropTypes.bool.isRequired,
  errors: PropTypes.array
};
