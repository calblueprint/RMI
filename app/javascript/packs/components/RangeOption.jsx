import React from 'react';
import PropTypes from 'prop-types';
import { debounce } from 'lodash';
import { PAUSE_INTERVAL_BEFORE_SAVE } from '../constants/index';
import { TRANSITION_DURATION } from './DependentQuestions';

class RangeOption extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      focused: false,
    };
  }

  componentDidMount() {
    this.trySaveAnswer = debounce(function (id, num) {
      this.props.onSave(id, num);
    }, PAUSE_INTERVAL_BEFORE_SAVE);

    if (this.props.answer) {
      this.onChange(this.props.answer.text);
    }

    if (this.props.focusOnMount) {
      setTimeout(() => this.ref.focus(), TRANSITION_DURATION * 2);
    }
  }

  updateAnswer(id, num, force=false) {
    this.props.onChange(id, num);
    this.trySaveAnswer(id, num);
    if (force) {
      this.trySaveAnswer.flush();
    }
  }

  onChange(num, force=false) {
    for (let id in this.props.options) {
      const option = this.props.options[id];
      if (num && num >= option.min && num <= option.max) {
        this.updateAnswer(id, num, force);
        return;
      }
    }

    // No dependent range hit, but we still want to update answer
    this.updateAnswer(null, num, force);
  }

  render() {
    const currentValue = this.props.answer ? this.props.answer.text : "";
    return (
      <div
        className={`input__range ${this.state.focused ? 'input__range--focused' : ''}`}
        onClick={(e) => this.ref.focus()}
      >
        <input
          type="number"
          value={currentValue}
          onChange={(e) => this.onChange(e.target.value)}
          onFocus={(e) => {
            this.setState({ focused: true });
            this.props.onEnter();
          }}
          onBlur={(e) => {
            this.onChange(e.target.value, true);
            this.setState({ focused: false });
            this.props.onLeave();
          }}
          ref={(ref) => this.ref = ref}
        />
        <label>{this.props.unit}</label>
      </div>
    );
  }
}

RangeOption.propTypes = {
  answer: PropTypes.shape({ // Optional - new questions can have no answer

  }),
  focusOnMount: PropTypes.bool.isRequired,
  options: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  onEnter: PropTypes.func.isRequired,
  onLeave: PropTypes.func.isRequired,
  unit: PropTypes.string
};

export default RangeOption;
