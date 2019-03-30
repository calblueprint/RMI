import {
  getAllActiveQuestions,
  getAllActiveQuestionsForCategory, getAllQuestionsByCategoryId,
} from "./questionsSelector";

export function getAnswerForQuestionAndBuilding(questionId, buildingId, state) {
  return state.buildings[buildingId].answers[questionId]
}

//##returns (from the questions provided) how many are remaining to answer
//##if no buildingId is provided, we are not viewing a specific building
// so we should not render how many questions are remaining for a building
//## if no questions are provided, the building did not have any questions for the users so they have no questions
//to answer for that building

export function getRemainingAnswersforCategory(categoryId, buildingId, state) {
  const categoryQuestions = getAllActiveQuestionsForCategory(categoryId, buildingId, state);
  return getNumUnanswered(categoryQuestions, buildingId, state);
}

export function getNumUnanswered(questions, buildingId, state) {
  return questions.reduce((count, question) => {
    if (isUnanswered(question, buildingId, state)) {
      return count + 1;
    }
    return count;
  }, 0);
}

export function isUnanswered(question, buildingId, state) {
  let answer = state.buildings[buildingId].answers[question.id];
  if (!answer || !answer.text.trim() && !answer.attachment_file_name && !answer.delegation_email) {
    return true;
  }
}

export function isDelegated(question, buildingId, state) {
  let answer = state.buildings[buildingId].answers[question.id];
  if (answer && answer.delegation_email) {
    return true;
  }
}

export function numAnswered(buildingId, state) {
  let answered = 0;
  let answers = state.buildings[buildingId].answers;
  let buildingQuestions = state.buildings[buildingId].questions;

  for (let key in answers) {
    let questionId = answers[key].question_id;
    if (buildingQuestions.includes(String(questionId)) && ((answers[key].text) || (answers[key].delegation_email))) {
      answered += 1;
    }
  }
  return answered;
}

export function getNumUnansweredForBuilding(buildingId, state) {
  const questions = state.buildings[buildingId].questions;
  const activeQuestions = getAllActiveQuestions(questions, buildingId, state);
  return getNumUnanswered(activeQuestions, buildingId, state);
}

export function questionDataPerCategory(buildingId, categoriesArray, state) {
  let catData = {};

  for (let category of categoriesArray) {
    const categoryQuestions = getAllActiveQuestionsForCategory(category.id, buildingId, state);
    const numUnanswered = getNumUnanswered(categoryQuestions, buildingId, state);

    catData[category.id] = {
      id: category.id,
      name: category.name,
      answered: categoryQuestions.length - numUnanswered,
      total: categoryQuestions.length
    };
  }
  return catData;
}

export function percentAnswered(buildingId, state) {
  let answered = 0;
  let total = 0;
  let answers = state.buildings[buildingId].answers;
  let buildingQuestions = state.buildings[buildingId].questions;

  for (let key in answers) {
    let questionId = answers[key].question_id;
    if (buildingQuestions.includes(String(questionId)) && ((answers[key].text) || (answers[key].delegation_email))) {
      answered += 1;
    }
    total += 1;
  }
  return answered / total;
}

// returns an array with the percent of answered questions for each building
export function progressForBuildingsArray(buildings, state) {
  let progressArray = [];
  for (let i = 0; i < buildings.length; i++) {
    let n = percentAnswered(buildings[i].id, state)
    progressArray.push(n);
  }
  return progressArray;
}