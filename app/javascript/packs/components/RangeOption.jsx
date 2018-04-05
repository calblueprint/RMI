import React from 'react';
import { debounce } from 'lodash';
import { PAUSE_INTERVAL_BEFORE_SAVE } from '../constants/index';

class RangeOption extends React.Component {
  componentDidMount() {
    this.trySaveAnswer = debounce(function (id, num) {
      this.props.onSave(id, num);
    }, PAUSE_INTERVAL_BEFORE_SAVE);

    if (this.props.answer) {
      this.onChange(this.props.answer.text);
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
    return (<div>
      <input
        type="number"
        value={currentValue}
        onChange={(e) => this.onChange(e.target.value)}
        onBlur={(e) => this.onChange(e.target.value, true)}
      />
    </div>)
  }
}

export default RangeOption;
