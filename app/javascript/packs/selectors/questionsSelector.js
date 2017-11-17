export function getQuestionsByBuilding(buildingId, state) {
  const buildingTypeId = state.buildings[buildingId].building_type_id;
  return state.building_types[buildingTypeId].questions.map((questionId) => {
    return state.questions[questionId];
  });
}

export function getDependentQuestionsForOptions(options, state) {
  const questions = [];
  for (let id in options) {
    questions.push(getDependentQuestionsForOption(options[id], state));
  }
  return questions;
}

export function getDependentQuestionsForOption(optionId, state) {
  return Object.keys(state.questions).filter((questionId) => {
    return state.questions[questionId].parent_option_id == optionId;
  }).map((questionId) => {
    return state.questions[questionId];
  });
}