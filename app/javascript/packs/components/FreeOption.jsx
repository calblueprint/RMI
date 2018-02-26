import React from 'react';

class FreeOption extends React.Component {
  render() {
    return (<div>
      <textarea value={this.props.answer} />
    </div>)
  }
}

export default FreeOption;
