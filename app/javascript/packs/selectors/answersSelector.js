export function getAnswerForQuestionAndBuilding(questionId, buildingId, state) {
  return state.buildings[buildingId].answers[questionId]
}

//##returns (from the questions provided) how many are remaining to answer
//##if no buildingId is provided, we are not viewing a specific building
// so we should not render how many questions are remaining for a building
//## if no questions are provided, the building did not have any questions for the users so they have no questions
//to answer for that building
export function getRemainingAnswersforCategory(questions, buildingId, state) {
  if (!buildingId) {
    return null;
  }
  if (questions) {
    return 0;
  }
  let counter = 0;
  for (let q of questions) {
    let answer = state.buildings[buildingId].answers[q];
    if (!answer.trim()) {
      counter = counter + 1;
    }
  }
  return counter;

}

