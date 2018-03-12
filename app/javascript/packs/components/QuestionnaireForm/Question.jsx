import React from 'react';

class Question extends React.Component {

  componentDidMount(){
    if (this.props.focus) {
      this.questionInput.focus();
    }
  }

  /**
   * Handles event for onBlur which is making fetch request
   * @param { string } text - the text of the question
   */
  handleOnBlur(text) {
    this.props.updateQuestion(this.props.question.id, { text })
  }

  /**
   * Handles event for onChange which is updating redux temporarily
   * @param { string } text - the text of the question
   */
  onChange(text) {
    this.props.handleOnChange(this.props.question.id, { text })
  }

  render() {
    return (
      <div>
        <input
          defaultValue={this.props.question.text}
          style={{width: 500}}
          onBlur={(e) => this.handleOnBlur(e.target.value)}
          onChange={(e) => this.onChange(e.target.value)}
          ref={(input) => { this.questionInput = input; }}
        />
        <div>
          {this.props.question.question_type}
        </div>
      </div>
    );
  }
};

export default Question

