export function getAnswerForQuestionAndBuilding(questionId, buildingId, state) {
    return state.buildings[buildingId].answers[questionId]
}

export function getRemainingAnswersforCategory(qFromC, buildingId, state) {
    let counter = 0;
    for (let q of qFromC) {
        let answer = state.buildings[buildingId].answers[q];
        if (!answer.trim()) {
            counter = counter + 1;
        }
    }
    return counter;
}

