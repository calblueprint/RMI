import React from 'react';
import PropTypes from 'prop-types';

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
  handleOnBlur(args) {
    this.props.handleOnBlur(this.props.question.id, args)
  }

  /**
   * Handles event for onChange which is updating redux temporarily
   * @param { string } text - the text of the question
   */
  onChange(args) {
    this.props.handleOnChange(this.props.question.id, args)
  }

  render() {
    return (
      <div>
        <input
          defaultValue={this.props.question.text}
          style={{width: 500}}
          onBlur={(e) => this.handleOnBlur({text: e.target.value})}
          onChange={(e) => this.onChange({text: e.target.value})}
          ref={(input) => { this.questionInput = input; }}
        />
        <span> Parameter: </span>
        <input
          placeholder={"param1"}
          defaultValue={this.props.question.parameter}
          onBlur={(e) => this.handleOnBlur({parameter: e.target.value})}
          onChange={(e) => this.onChange({parameter: e.target.value})}
        />
        <div>
          {this.props.question.question_type}
        </div>
      </div>
    );
  }
};

export default Question

Question.propTypes = {
  handleOnBlur: PropTypes.func.isRequired,
  handleOnChange: PropTypes.func.isRequired,
  focus: PropTypes.bool.isRequired,
  question: PropTypes.object.isRequired
};
