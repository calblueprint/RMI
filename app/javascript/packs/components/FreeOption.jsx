import React from 'react';

class FreeOption extends React.Component {
  render() {
    return (<div>
      <textarea value={this.props.answer ? this.props.answer.text : ""} />
    </div>)
  }
}

export default FreeOption;
