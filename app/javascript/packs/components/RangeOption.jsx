import React from 'react';
import { debounce } from 'lodash';

class RangeOption extends React.Component {
  componentDidMount() {
    this.trySaveAnswer = debounce(function (id, num) {
      this.props.onSave(id, num);
    }, 3000);

    if (this.props.answer) {
      this.onChange(this.props.answer.text);
    }
  }

  updateAnswer(id, num) {
    this.props.onChange(id, num);
    this.trySaveAnswer(id, num);
  }

  onChange(num) {
    for (let id in this.props.options) {
      const option = this.props.options[id];
      if (num && num >= option.min && num <= option.max) {
        this.updateAnswer(id, num);
        return;
      }
    }

    // No dependent range hit, but we still want to update answer
    this.updateAnswer(null, num);
  }

  render() {
    const currentValue = this.props.answer ? this.props.answer.text : "";
    return (<div>
      <input
        type="number"
        value={currentValue}
        onChange={(e) => this.onChange(e.target.value)}
      />
    </div>)
  }
}

export default RangeOption;
