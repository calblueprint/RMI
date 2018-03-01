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
 * {
 *    2: [{ <question> }, { <question> }, { <question> }],
 *    3: [{ <question> }, { <question> }]
 * }
 */
export function getDependentQuestionsForOptions(options, question_type, state) {
  const questions = {};
  for (let id in options) {
    questions[id] = getDependentQuestionsForOption(id, question_type, state);
  }
  return questions;
}

export function getDependentQuestionsForOption(optionId, option_type, state) {
  return Object.keys(state.questions).filter((questionId) => {
    // We need to check that the option's type matches what is expected by the potential dependent question,
    // because there could be a DropdownOption and RangeOption with the same id.
    return state.questions[questionId].parent_option_id == optionId &&
            state.questions[questionId].parent_option_type.toLowerCase().includes(option_type);
  }).map((questionId) => {
    return state.questions[questionId];
  });
}
