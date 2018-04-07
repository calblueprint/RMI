export function getQuestionsByBuilding(buildingId, state) {
  const questions = state.buildings[buildingId].questions;
  return questions.map((questionId) => {
    return state.questions[questionId];
  });
}

/**
 * Returns a hash of dependent questions for the given options,
 * where the keys are option ids and values are arrays of question objects.
 *
 * @param { Array[] } optionIds       An array of option IDs whose dependent questions we want to find
 * @param { String }  questionType    The type of question (dropdown, range, or free)
 * @param { Object }  state           state in store
 *
 * @returns { Object } hash of option ids to dependent question arrays
 *
 *      {
 *         option_id: [{ <question> }, { <question> }, { <question> }],
 *      }
 */
export function getDependentQuestionsForOptions(optionIds, questionType, state) {
  const questions = {};
  for (let id in optionIds) {
    questions[id] = getDependentQuestionsForOption(id, questionType, state);
  }
  return questions;
}

export function getDependentQuestionsForOption(optionId, optionType, state) {
  return Object.keys(state.questions).filter((questionId) => {
    // We need to check that the option's type matches what is expected by the potential dependent question,
    // because there could be a DropdownOption and RangeOption with the same id.
    return state.questions[questionId].parent_option_id == optionId &&
            state.questions[questionId].parent_option_type.toLowerCase().includes(optionType);
  }).map((questionId) => {
    return state.questions[questionId];
  });
}

/**
 * Recursively find all potentially dependent questions on the given question.
 *
 */
export function getPotentialDependentQuestions(parentQuestion, state) {
  var potentialChildren = [].concat(
    ...Object.values(parentQuestion.options).map((option) => {
      return getDependentQuestionsForOption(option.id, parentQuestion.question_type, state);
    })
  );

  if (potentialChildren.length == 0) {
    return [];
  } else {
    return potentialChildren.concat(potentialChildren.map(
      (child) => getPotentialDependentQuestions(child, state)
    ));
  }
}
