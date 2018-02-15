import React from 'react';

class FileOption extends React.Component {

  // TODO: handle click of upload button
  handleUpload(e) {

  }

  // get link to file already uploaded
  getFileLink() {
    if (this.props.answer) {
      // Need to generate link
      return "/api/answers/" + this.props.answer.id;
    } else {
      return "";
    }
  }

  render() {
    const currentFileName = this.props.answer ? this.props.answer.attachment_file_name : "";
    const currentFileLink = this.getFileLink()

    // filler is None when no file corresponds to this field
    const filler = this.props.answer ? "" : "None";

    return (<div>
      File uploaded: <a href={currentFileLink}>{currentFileName}</a>{filler}<br>
      <input
        type="file"
      />
      <button
        type="submit" value="Upload"
        onclick={this.handleUpload(e)}
      >Upload</button>
    </div>)
  }
}

export default FileOption;
