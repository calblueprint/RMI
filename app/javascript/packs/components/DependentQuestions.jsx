import React from 'react';
import { CSSTransition } from 'react-transition-group';

import OptionsContainer from '../containers/OptionsContainer';

const TRANSITION_DURATION = 0.4;

function DependentQuestions({
  answer, dependentQuestions, buildingId, parentIsHidden = false
}) {
  if (!answer) return null;

  const dependentOptionIds = Object.keys(dependentQuestions);
  const allDependentQuestions = dependentOptionIds.reduce((arr, key) => {
    const questions = dependentQuestions[key];
    return arr.concat(questions);
  }, []);

  const selectedOption = answer.selected_option_id;

  // The subset of questions caused to be shown by the selectedOption
  let visibleDependents = dependentQuestions[selectedOption] || [];
  
  const firstVisibleDependent = visibleDependents.length > 0
      ? visibleDependents[0]
      : null;

  return (<div className="questions__nested">
    {
      allDependentQuestions.map((question, i) => {
        const visibleQuestion = question.parent_option_id === selectedOption;
        const isActive = visibleQuestion && !parentIsHidden;

        return (<CSSTransition
          in={isActive}
          timeout={0}
          classNames="questions__nested-"
        >
          {(state) => (
            <div
              key={question.id}
              style={{...styles, ...transitionStyles[state]}}
            >
              <OptionsContainer
                building_id={buildingId}
                question_id={question.id}
                focusOnMount={
                  firstVisibleDependent && question.id === firstVisibleDependent.id
                }
                parentIsHidden={!isActive}
                {...question}
              />
            </div>
          )}
        </CSSTransition>);
      })
    }
  </div>);
};



const styles = {
  transition: `all ${TRANSITION_DURATION}s ease`,
  overflowY: 'hidden'
};

const transitionStyles = {
  entering: {
    maxHeight: 0,
    transform: 'translateX(-20px)',
    marginLeft: 0,
    opacity: 0,
  },
  entered: {
    maxHeight: 800,
    marginLeft: 20,
    opacity: 1,
    visibility: 'visible',
  },
  exiting: {
    maxHeight: 800,
    opacity: 1,
  },
  exited: {
    maxHeight: 0,
    marginLeft: 0,
    opacity: 0,
    visibility: 'hidden',
  }
};

export default DependentQuestions;
