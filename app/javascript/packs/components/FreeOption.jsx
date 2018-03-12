import React from 'react';

class FreeOption extends React.Component {
  onChange(value) {
    this.props.onChange(null, value)
  }

  render() {
    return (<div>
      <textarea value={this.props.answer ? this.props.answer.text : ""}
                onChange={(e) => this.onChange(e.target.value)} />
    </div>)
  }
}

export default FreeOption;