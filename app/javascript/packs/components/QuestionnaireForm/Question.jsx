import React from 'react';

const Question = (question) => {
  return (<div>
    <textarea placeholder={question.text}></textarea>
  </div>);
}

export default Question

