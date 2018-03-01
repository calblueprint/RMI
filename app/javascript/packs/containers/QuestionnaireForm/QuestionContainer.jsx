import React from 'react';
import Question from '../../components/QuestionnaireForm/Question';
import DepQuestionContainer from './DepQuestionContainer';

const QuestionContainer = (props) => {
  return (
    <div>
      <Question question={props.question}/>
      <DepQuestionContainer
        question={props.question}
        optionsList={Object.keys(props.question.options)}
        questions={props.questions}
      />
    </div>
  );
}

export default QuestionContainer;
