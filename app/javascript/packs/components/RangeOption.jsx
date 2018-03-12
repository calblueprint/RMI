import React from 'react';
import { debounce } from 'lodash';

class RangeOption extends React.Component {
  componentDidMount() {
    this.props.onSave = debounce(this.props.onChange, 3000);

    if (this.props.answer) {
      this.checkRange(this.props.answer.text);
    }
  }

  saveAnswer(option_id, num) {
    this.props.onChange(option_id, num);
    this.props.onSave(option_id, num);
  }

  checkRange(num) {
    for (let id in this.props.options) {
      const option = this.props.options[id];
      if (num && num >= option.min && num <= option.max) {
        this.saveAnswer(id, num);
        return;
      }
    }

    // No dependent range hit, but we still want to update answer
    this.saveAnswer(null, num);
  }

  render() {
    const currentValue = this.props.answer ? this.props.answer.text : "";
    return (<div>
      <input
        type="number"
        value={currentValue}
        onChange={(e) => this.checkRange(e.target.value)}
      />
    </div>)
  }
}

export default RangeOption;
