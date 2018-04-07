import React from 'react';
import PropTypes from 'prop-types';
import fontawesome from '@fortawesome/fontawesome';
import faCheck from '@fortawesome/fontawesome-free-solid/faCheck';

import { TRANSITION_DURATION } from './DependentQuestions';

class DropdownOption extends React.Component {
  componentDidMount() {
    if (this.props.answer) {
      const selected_option_id = this.props.answer.selected_option_id;
      if (selected_option_id) {
        this.saveAnswer(selected_option_id, this.props.answer.text);
      }
    }

    if (this.props.focusOnMount) {
      setTimeout(() => this.ref.focus(), TRANSITION_DURATION * 2);
    }
  }

  /**
   * Returns current option ID being displayed by this DropdownOption component
   * or the string "unselected" if null.
   * @returns { String } Option ID or "unselected"
   */
  currentValue() {
    if (this.props.answer && this.props.answer.selected_option_id) {
      return this.props.answer.selected_option_id;
    } else {
      return "unselected";
    }
  }

  onChange(optionId) {
    this.saveAnswer(optionId, this.props.options[optionId].text);
  }

  /**
   * Updates the Redux store with a bound onChange function paseed from
   * OptionsContainer and attempts to save it to the backend.
   * @param { String } optionId - Option ID to save
   * @param { String } text - Text value of this selected option
   */
  saveAnswer(optionId, text) {
    if (this.currentValue() == optionId) {
      // For unselecting an option (through the button control scheme)
      return this.props.onChange(null, null);
    }
    this.props.onChange(optionId, text);
    this.props.onSave(optionId, text);
  }

  render() {
    const currentValue = this.currentValue();
    const options = Object.values(this.props.options);
    if (options.length <= 5) {
      return (
        <div
          onMouseOver={(e) => this.props.onEnter()}
          onMouseOut={(e) => this.props.onLeave()}
        >
        {options.map((option, i) => (
          <button
            key={option.id}
            value={option.id}
            onClick={(e) => this.onChange(e.target.value)}
            onFocus={(e) => this.props.onEnter()}
            onBlur={(e) => this.props.onLeave()}
            className={`input__dropdown ${
              currentValue == option.id ? 'input__dropdown--selected' : ''
            }`}
            ref={(ref) => this.ref = i === 0 ? ref : this.ref}
          >
            {option.text}
            {
              currentValue == option.id ?
              <i
                style={{ marginLeft: '10px' }}
                dangerouslySetInnerHTML={{
                  __html: fontawesome.icon(faCheck).html[0]
                }}
              /> : null
            }
          </button>
        ))}
        </div>
      );
    }

    return (
      <div>
        <select
          value={currentValue}
          onChange={(e) => this.onChange(e.target.value)}
          onFocus={(e) => this.props.onEnter()}
          onBlur={(e) => this.props.onLeave()}
          ref={(ref) => this.ref = ref}
        >
          <option value="unselected" disabled>Select an option</option>
          {options.map((option) => {
            return (<option value={option.id} key={option.id}>{option.text}</option>)
          })}
        </select>
      </div>
    );
  }
}

DropdownOption.propTypes = {
  answer: PropTypes.shape({ // Optional - new questions can have no answer

  }),
  focusOnMount: PropTypes.bool.isRequired,
  options: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  onEnter: PropTypes.func.isRequired,
  onLeave: PropTypes.func.isRequired,
};

export default DropdownOption;
