import React from 'react';
import PropTypes from 'prop-types';
import { debounce } from 'lodash';
import { PAUSE_INTERVAL_BEFORE_SAVE } from '../constants/index';

import { TRANSITION_DURATION } from './DependentQuestions';

class FreeOption extends React.Component {
  componentDidMount() {
    this.trySaveAnswer = debounce(function (value) {
      this.props.onSave(null, value);
    }, PAUSE_INTERVAL_BEFORE_SAVE);

    if (this.props.focusOnMount) {
      setTimeout(() => this.ref.focus(), TRANSITION_DURATION * 2);
    }
  }

  onChange(value, force=false) {
    this.props.onChange(null, value);
    this.trySaveAnswer(value);
    if (force) {
      this.trySaveAnswer.flush();
    }
  }

  render() {
    return (
      <div className="input__text">
        <textarea
          value={this.props.answer ? this.props.answer.text : ""}
          onChange={(e) => this.onChange(e.target.value)}
          onFocus={(e) => this.props.onEnter()}
          onBlur={(e) => {
            this.onChange(e.target.value, true);
            this.props.onLeave();
          }}
          ref={(ref) => this.ref = ref}
        />
      </div>
    );
  }
}

FreeOption.propTypes = {
  answer: PropTypes.shape({ // Optional - new questions can have no answer

  }),
  focusOnMount: PropTypes.boolean.isRequired,
  onChange: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  onEnter: PropTypes.func.isRequired,
  onLeave: PropTypes.func.isRequired,
};

export default FreeOption;
