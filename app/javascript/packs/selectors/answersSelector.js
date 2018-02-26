export function getAnswerForQuestionAndBuilding(questionId, buildingId, state) {
    return state.buildings[buildingId].answers[questionId]
}

export function getAnswersforBuilding(entity, id, state) {
    if (entity == "buildings") {
        if (id) {
            return state.buildings[id].answers;
        }
    }
    return null
}

export function getRemainingAnswersforCategory(answers, category) {
    let counter = 0;
    for (const answer of answers) {
        if (answer == "%EMPTY%") {
            counter = counter + 1;
        }
    }
    return counter;
}

