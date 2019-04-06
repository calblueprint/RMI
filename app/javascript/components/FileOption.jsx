import React from 'react';
import { FETCH_IN_PROGRESS } from '../constants/index';
import RangeOption from "./RangeOption";

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

  humanFileSize(size) {
    const i = size == 0 ? 0 : Math.floor(Math.log(size) / Math.log(1024));
    return (size / Math.pow(1024, i)).toFixed(2) * 1 + ' ' + ['B', 'kB', 'MB', 'GB', 'TB'][i];
  }

  render() {
    if (!this.props.editable) {
      // TODO: how do we represent uneditable FileOptions?
      // This might not actually be necessary because file uploads can never trigger any
      // child questions, so we could just not render it at all
      const dummy = () => {};
      return <RangeOption editable={false} focusOnMount={false}
                          onChange={dummy} onEnter={dummy} onLeave={dummy} onSave={dummy} options={{}}/>;
    }

    const currentFileName = this.currentFileExists() ? this.props.answer.attachment_file_name : "";
    const currentFileLink = this.getFileLink();

    if (this.currentFileExists()) {
      return (<div>
        <a target="_blank" href={currentFileLink} download>{currentFileName}</a>
        <p>({this.humanFileSize(this.props.answer.attachment_file_size)})</p>
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
