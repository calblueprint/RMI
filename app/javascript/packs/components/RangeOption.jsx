import React from 'react';

class RangeOption extends React.Component {
  checkRange(num) {
    for (let id in this.props.options) {
      const option = this.props.options[id];
      if (num && num >= option.min && num <= option.max) {
        this.props.onSelect(id);
        return;
      }
    }
  }

  componentDidMount() {
    if (this.props.answer) {
      this.checkRange(this.props.answer.text);
    }
  }

  render() {
    const currentValue = this.props.answer ? this.props.answer.text : "";
    return (<div>
      <input type="number" defaultValue={currentValue} onChange={(e) => this.checkRange(e.target.value)} />
    </div>)
  }
}

export default RangeOption;
