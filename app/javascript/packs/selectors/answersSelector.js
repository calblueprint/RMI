export function getAnswerForQuestionAndBuilding(questionId, buildingId, state) {
    return state.buildings[buildingId].answers[questionId]
}

//returns (from the questions provided) how many are remaining to answer
export function getRemainingAnswersforCategory(questions, buildingId, state) {
    if (buildingId) {
        if (questions) {
            let counter = 0;
            for (let q of questions) {
                let answer = state.buildings[buildingId].answers[q];
                if (!answer.trim()) {
                    counter = counter + 1;
                }
            }
            return counter;
        }
        return 0;
    }
    return null;
}

