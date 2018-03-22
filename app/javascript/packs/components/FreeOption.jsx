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

  test(e) {
    this.onChange(e.target.value);
  }

  render() {
    return (<div>
      <textarea value={this.props.answer ? this.props.answer.text : ""}
                onChange={this.test.bind(this)}
                onBlur={(e) => this.onChange(e.target.value, true)} />
    </div>)
  }
}

export default FreeOption;
