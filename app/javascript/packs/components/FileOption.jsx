import React from 'react';

class FileOption extends React.Component {
  handleUpload(e) {
    const file = e.target.files[0];
    this.props.onFileUpload(file);
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
      <input type="file" onChange={(e) => this.handleUpload(e)} />
    </div>)
  }
}

export default FileOption;
