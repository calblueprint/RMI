import React from 'react';
import PropTypes from 'prop-types';
import InputValidation from '../InputValidation';

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
    this.props.handleOnBlur(this.props.question.id, { text })
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
          <InputValidation
            errors={this.props.question.error}
          />
        </div>
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
  question: PropTypes.object.isRequired,
};
