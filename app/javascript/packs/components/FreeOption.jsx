import React from 'react';
import { debounce } from 'lodash';
import { PAUSE_INTERVAL_BEFORE_SAVE } from '../constants/index';

class FreeOption extends React.Component {
  componentDidMount() {
    this.trySaveAnswer = debounce(function (value) {
      this.props.onSave(null, value);
    }, PAUSE_INTERVAL_BEFORE_SAVE);
  }

  onChange(value, force=false) {
    this.props.onChange(null, value);
    this.trySaveAnswer(value);
    if (force) {
      this.trySaveAnswer.flush();
    }
  }

  render() {
    return (<div class="input__text">
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
    </div>);
  }
}

export default FreeOption;
