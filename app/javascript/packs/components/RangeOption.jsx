import React from 'react';

class RangeOption extends React.Component {
  checkRange(num) {
    const triggered_option_ids = [];
    for (let id in this.props.options) {
      const option = this.props.options[id];
      if (num && num >= option.min && num <= option.max) {
        triggered_option_ids.push(id);
      }
    }
    this.props.onSelect(triggered_option_ids);
  }

  componentDidMount() {
    this.checkRange(this.props.answer.text);
  }

  render() {
    return (<div>
      <input type="number" defaultValue={this.props.answer.text} onChange={(e) => this.checkRange(e.target.value)} />
    </div>)
  }
}

export default RangeOption;
