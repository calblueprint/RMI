import React from 'react';
import OptionsContainer from '../containers/OptionsContainer';

const Question = (props) => {
  //<OptionsContainer
  //questionId={props.id}
  //options={props.options}
  ///>

  return (<div>
    <p>{props.text}</p>
    <OptionsContainer question_id={props.id}
                      building_id={props.building_id}
                      question_type={props.question_type}
                      options={props.options} />
    <hr />
  </div>);
};

export default Question;