import React from 'react';

class FileOption extends React.Component {

  // TODO: handle click of upload button
  handleUpload() {

  }

  // get link to file already uploaded
  getFileLink() {
    if (this.currentFileExists()) {
      // Need to generate link
      return "/api/answers/" + this.props.answer.id;
    } else {
      return "";
    }
  }

  currentFileExists() {
    return this.props.answer && this.props.answer.attachment_file_name;
  }

  render() {
    const currentFileName = this.currentFileExists() ? this.props.answer.attachment_file_name : "";
    const currentFileLink = this.getFileLink();

    // filler is None when no file corresponds to this field
    const filler = this.currentFileExists() ? "" : "None";

    return (
    <div>
      File uploaded:
      <a href= {currentFileLink} > {currentFileName} </a> {filler} <br></br>
      <input type="file" />
      <button
        type="submit" value="Upload"
        onClick={this.handleUpload}
      >Upload</button>
    </div>)
  }
}

export default FileOption;
