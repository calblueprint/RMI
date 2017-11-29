export function getAnswerForQuestionAndBuilding(questionId, buildingId, state) {
  return state.buildings[buildingId].answers[questionId]
}
