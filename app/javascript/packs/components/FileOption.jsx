import React from 'react';

class FileOption extends React.Component {

  componentDidMount() {
    // TODO: Should it be deleted?
  }

  render() {
    return (<div>
      <input
        type="file"
        onChange={this.onChange}
      />
    </div>)
  }
}

export default FileOption;
