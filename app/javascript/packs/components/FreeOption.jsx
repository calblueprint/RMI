import React from 'react';
import { debounce } from 'lodash';

class FreeOption extends React.Component {
  onComponentDidMount() {
    this.props.onSave = debounce(this.props.onChange, 3000);
  }

  onChange(value) {
    this.props.onChange(null, value);
    this.props.onSave(null, num);
  }

  render() {
    return (<div>
      <textarea value={this.props.answer ? this.props.answer.text : ""}
                onChange={(e) => this.onChange(e.target.value)} />
    </div>)
  }
}

export default FreeOption;
