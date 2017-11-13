import React from 'react';
import OptionsContainer from '../containers/OptionsContainer';

const Question = (props) => {
    //<OptionsContainer
      //questionId={props.id}
      //options={props.options}
    ///>

  return (<div key={props.id}>
    <p>{props.text}</p>
  </div>);
};

export default Question;

