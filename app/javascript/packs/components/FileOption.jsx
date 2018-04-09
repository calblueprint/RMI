import React from 'react';
import { FETCH_IN_PROGRESS } from '../constants/index';

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

  isUploading() {
    return this.props.answer && this.props.answer.fetchStatus === FETCH_IN_PROGRESS;
  }

  downloadFile() {
    console.log("DOWNLOAD FILE");
  }

  humanFileSize(size) {
    const i = size == 0 ? 0 : Math.floor(Math.log(size) / Math.log(1024));
    return (size / Math.pow(1024, i)).toFixed(2) * 1 + ' ' + ['B', 'kB', 'MB', 'GB', 'TB'][i];
  }

  render() {
    const currentFileName = this.currentFileExists() ? this.props.answer.attachment_file_name : "";
    const currentFileLink = this.getFileLink();

    if (this.currentFileExists()) {
      return (<div>
          <button onClick={this.downloadFile}
                  style={{background: 'none',
                          border: 'none',
                          textDecoration: 'underline',
                          color: 'blue'}}>
            {this.props.answer.attachment_file_name}
          </button>
          ({this.humanFileSize(this.props.answer.attachment_file_size)})
        <button onClick={this.props.onFileDelete}>Delete</button>
      </div>)
    }
    else if (this.isUploading()) {
      return (<div>
        <p>Uploading file...</p>
      </div>)
    }
    else {
      return (<div>
        <input type="file" onChange={(e) => this.handleUpload(e)} />
      </div>)
    }
  }
}

export default FileOption;
