import React from "react";
import PropTypes from "prop-types";
import { CSSTransition } from "react-transition-group";

import QuestionContainer from "../containers/QuestionContainer";

const TRANSITION_DURATION = 0.4;

function DependentQuestions({
  allowedQuestionIds,
  answer,
  dependentQuestions,
  buildingId,
  parentIsHidden = false,
  disableFocusOnMount = false,
  editableMap
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

  const firstVisibleDependent =
    visibleDependents.length > 0 ? visibleDependents[0] : null;

  return (
    <div className="questions__nested">
      {allDependentQuestions.filter(question => allowedQuestionIds.includes(String(question.id))).map((question, i) => {
        const visibleQuestion = question.parent_option_id == selectedOption;
        const isActive = visibleQuestion && !parentIsHidden;

        return (
          <CSSTransition
            in={isActive}
            timeout={{
              enter: 0,
              exit: TRANSITION_DURATION * 1000
            }}
            classNames="questions__nested-"
            unmountOnExit={true}
            key={question.id}
          >
            {state => (
              <div style={{ ...styles, ...transitionStyles[state] }}>
                <QuestionContainer
                  mode="answer"
                  building_id={buildingId}
                  focusOnMount={
                    !disableFocusOnMount &&
                    !!firstVisibleDependent &&
                    question.id === firstVisibleDependent.id
                  }
                  parentIsHidden={!isActive}
                  {...question}
                  editableMap={editableMap}
                />
              </div>
            )}
          </CSSTransition>
        );
      })}
    </div>
  );
}

const styles = {
  transition: `all ${TRANSITION_DURATION}s ease`,
  overflowY: "hidden"
};

const transitionStyles = {
  entering: {
    maxHeight: 0,
    transform: "translateX(-20px)",
    marginLeft: 0,
    opacity: 0
  },
  entered: {
    maxHeight: 800,
    marginLeft: 20,
    opacity: 1,
    visibility: "visible"
  },
  exiting: {
    maxHeight: 800,
    maxHeight: 0,
    marginLeft: 0,
    opacity: 0
  },
  exited: {
    visibility: "hidden"
  }
};

DependentQuestions.propTypes = {
  allowedQuestionIds: PropTypes.array.isRequired,
  answer: PropTypes.shape({
    // Optional - new questions can have no answer
  }),
  dependentQuestions: PropTypes.object.isRequired,
  buildingId: PropTypes.number.isRequired,
  parentIsHidden: PropTypes.bool.isRequired
};

DependentQuestions.defaultProps = {
  parentIsHidden: false
};

export { TRANSITION_DURATION };
export default DependentQuestions;
