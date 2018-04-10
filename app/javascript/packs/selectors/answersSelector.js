export function getAnswerForQuestionAndBuilding(questionId, buildingId, state) {
  return state.buildings[buildingId].answers[questionId]
}

//##returns (from the questions provided) how many are remaining to answer
//##if no buildingId is provided, we are not viewing a specific building
// so we should not render how many questions are remaining for a building
//## if no questions are provided, the building did not have any questions for the users so they have no questions
//to answer for that building
export function getRemainingAnswersforCategory(questions, buildingId, state) {
  return questions.reduce((count, question) => {
    let answer = state.buildings[buildingId].answers[question.id];
    if (!answer || !answer.text && !answer.attachment_file_name) {
      return count + 1;
    }
    return count;
  }, 0);
}

