import {
  getAllActiveQuestions,
  getAllActiveQuestionsForCategory,
  getAllQuestionsByCategoryId
} from "./questionsSelector";
import { getCategoriesForBuilding } from "./categoriesSelector";

export function getAnswerForQuestionAndBuilding(questionId, buildingId, state) {
  return state.buildings[buildingId].answers[questionId];
}

//##returns (from the questions provided) how many are remaining to answer
//##if no buildingId is provided, we are not viewing a specific building
// so we should not render how many questions are remaining for a building
//## if no questions are provided, the building did not have any questions for the users so they have no questions
//to answer for that building

export function getRemainingAnswersforCategory(categoryId, buildingId, state) {
  const categoryQuestions = getAllActiveQuestionsForCategory(
    categoryId,
    buildingId,
    state
  );
  return getNumUnanswered(categoryQuestions, buildingId, state);
}

export function getNumUnanswered(questions, buildingId, state) {
  return questions.reduce((count, question) => {
    if (isUnansweredQuestion(question, buildingId, state)) {
      return count + 1;
    }
    return count;
  }, 0);
}

export function getNumAnswered(questions, buildingId, state) {
  return questions.reduce((count, question) => {
    if (isUnansweredQuestion(question, buildingId, state)) {
      return count;
    }
    return count + 1;
  }, 0);
}

export function getAllActiveAnswersForCategory(categoryId, buildingId, state) {
  const answers = state.buildings[buildingId].answers;

  let activeAnswers = []
  for (let key in answers) {
    if (state.questions[answers[key].id].category_id === categoryId) {
      activeAnswers.push(answers[key])
    }
  }
  return activeAnswers;
}

// is unanswered if there is no text and no delegation
export function isUnansweredQuestion(question, buildingId, state) {
  let answer = state.buildings[buildingId].answers[question.id];
  return !isValidAnswer(answer);
}

export function isValidAnswer(answer) {
  if (
    answer &&
    (answer.text.trim() ||
      answer.attachment_file_name ||
      answer.delegation_email)
  ) {
    return true;
  }
  return false;
}

export function isDelegatedQuestion(question, buildingId, state) {
  let answer = getAnswerForQuestionAndBuilding(question.id, buildingId, state);
  return isDelegatedAnswer(answer);
}

export function isDelegatedAnswer(answer) {
  if (answer && answer.delegation_email) {
    return true;
  }
  return false;
}

export function numAnswered(buildingId, state) {
  const questions = state.buildings[buildingId].questions;
  const activeQuestions = getAllActiveQuestions(questions, buildingId, state);
  return getNumAnswered(activeQuestions, buildingId, state);
}

export function getNumUnansweredForBuilding(buildingId, state) {
  const questions = state.buildings[buildingId].questions;
  const activeQuestions = getAllActiveQuestions(questions, buildingId, state);
  return getNumUnanswered(activeQuestions, buildingId, state);
}

export function percentAnswered(buildingId, state) {
  let answered = numAnswered(buildingId, state);
  let unanswered = getNumUnansweredForBuilding(buildingId, state);
  let total = answered + unanswered;
  return answered / total;
}

export function getPercentAnsweredForBuildingGroup(buildings, state) {
  let unanswered = {};
  for (let i = 0; i < buildings.length; i++) {
    unanswered[buildings[i].id] = percentAnswered(buildings[i].id, state);
  }
  return unanswered;
}

export function getDelegation(question, buildingId, state) {
  let answer = state.buildings[buildingId].answers[question.id];
  if (answer && answer.delegation_email) {
    return {name: answer.delegation_first_name + " " + answer.delegation_last_name, email: answer.delegation_email};
  }
}

export function getDelegations(categoryQuestions, buildingId, state) {
  let delegations = [];
  for (let i = 0; i < categoryQuestions.length; i++) {
    let question = categoryQuestions[i];
    let delegation = getDelegation(question, buildingId, state)
    if (delegation) {
      delegations.push(delegation);
    }
  }
  return delegations;
}

export function questionDataPerCategory(buildingId, state) {
  let catData = {};
  let categoriesArray = getCategoriesForBuilding(buildingId, state);

  for (let category of categoriesArray) {
    const categoryQuestions = getAllActiveQuestionsForCategory(
      category.id,
      buildingId,
      state
    );
    const numUnanswered = getNumUnanswered(
      categoryQuestions,
      buildingId,
      state
    );

    catData[category.id] = {
      id: category.id,
      name: category.name,
      answered: categoryQuestions.length - numUnanswered,
      total: categoryQuestions.length,
      delegations: getDelegations(categoryQuestions, buildingId, state)
    };
  }
  return catData;
}



