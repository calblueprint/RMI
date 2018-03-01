import React from 'react';

const Question = (
  props
) => {
  return (
    <div>
      <textarea defaultValue={props.question.text} style={{width: 500}}></textarea>
    </div>
  );
};

export default Question

