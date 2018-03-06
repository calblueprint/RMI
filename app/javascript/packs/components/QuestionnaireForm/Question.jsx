import React from 'react';

class Question extends React.Component {

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

