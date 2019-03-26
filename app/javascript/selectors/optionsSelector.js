export function getOptionByOptionId(optionId, questionId, state) {
  return state.questions[questionId].options[optionId]
}
