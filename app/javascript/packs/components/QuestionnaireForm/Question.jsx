import React from 'react';

class Question extends React.Component {

  handleOnBlur(text) {
    this.props.updateQuestion(this.props.question.id, { text })
  }

  onChange(text) {
    this.props.handleOnChange(this.props.question.id, { text })
  }

  render() {
    return (
      <div>
        <input
          defaultValue={this.props.question.text}
          style={{width: 500}}
        />
      </div>
    );
  }
};

export default Question

