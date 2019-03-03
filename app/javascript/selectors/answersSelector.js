import {getPotentialDependentQuestions} from "./questionsSelector";

export function getAnswerForQuestionAndBuilding(questionId, buildingId, state) {
  return state.buildings[buildingId].answers[questionId]
}

//##returns (from the questions provided) how many are remaining to answer
//##if no buildingId is provided, we are not viewing a specific building
// so we should not render how many questions are remaining for a building
//## if no questions are provided, the building did not have any questions for the users so they have no questions
//to answer for that building

export function getRemainingAnswersforCategory(questions, buildingId, state) {
  questions = questions.filter((question) => {
    if (question.parent_option_id) {
      let filteredQuestion = questions.filter((pQuestion) => {
        return (Object.keys(pQuestion.options).map(i => parseInt(i)).includes(question.parent_option_id));
      })[0];

      if (!filteredQuestion) return false;
      let answerForFilteredQuestion = state.buildings[buildingId].answers[filteredQuestion.id];
      if (!answerForFilteredQuestion) return false;

      let option = answerForFilteredQuestion.selected_option_id;
      return (!option || option == question.parent_option_id);
    }
    return true;
  });
  let dependentQuestions = [];
  return questions.reduce((count, question) => {
    if (isUnanswered(question, buildingId, state) && !dependentQuestions.includes(question)) {
        if (isDelegated(question, buildingId, state)) {
          let currDQ = getPotentialDependentQuestions(question, state);
          dependentQuestions.push(...currDQ);
        } else {
          return count + 1;
        }
    }
    return count;
  }, 0);
}

export function isUnanswered(question, buildingId, state) {
  let answer = state.buildings[buildingId].answers[question.id];
  if (!answer || !answer.text.trim() && !answer.attachment_file_name) {
    return true;
  }
}

export function isDelegated(question, buildingId, state) {
  let answer = state.buildings[buildingId].answers[question.id];
  if (answer && answer.delegation_email) {
    return true;
  }
}

// returns number of undelegated questions for all questions of building 
export function numUnanswered(buildingId, state) {
  let unanswered = 0;
  let answers = state.buildings[buildingId].answers;

  for (let key in answers) {
    if (!(answers[key].text) && !(answers[key].delegation_email)) {
      unanswered += 1;
    }
  }
  return unanswered;
}