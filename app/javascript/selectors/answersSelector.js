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

export function getAllActiveAnswersForCategory(categoryId, buildingId, state) {
  const answers = state.buildings[buildingId].answers;

  let activeAnswers = [];
  for (let key in answers) {
    if (state.questions[answers[key].id].category_id === categoryId) {
      activeAnswers.push(answers[key]);
    }
  }
  return activeAnswers;
}

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
  let answered = 0;
  let answers = state.buildings[buildingId].answers;
  let buildingQuestions = state.buildings[buildingId].questions;

  for (let key in answers) {
    let questionId = answers[key].question_id;
    if (
      buildingQuestions.includes(String(questionId)) &&
      (answers[key].text || answers[key].delegation_email)
    ) {
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

export function percentAnswered(buildingId, state) {
  let answered = 0;
  let total = 0;
  let answers = state.buildings[buildingId].answers;
  let buildingQuestions = state.buildings[buildingId].questions;

  for (let key in answers) {
    let questionId = answers[key].question_id;
    if (
      buildingQuestions.includes(String(questionId)) &&
      (answers[key].text || answers[key].delegation_email)
    ) {
      answered += 1;
    }
    total += 1;
  }
  return answered / total;
}

export function getDelegation(question, buildingId, state) {
  let answer = state.buildings[buildingId].answers[question.id];
  if (answer && answer.delegation_email) {
    return {
      name: answer.delegation_first_name + " " + answer.delegation_last_name,
      email: answer.delegation_email
    };
  }
}

export function getDelegations(categoryQuestions, buildingId, state) {
  let delegations = [];
  for (let i = 0; i < categoryQuestions.length; i++) {
    let question = categoryQuestions[i];
    let delegation = getDelegation(question, buildingId, state);
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
  console.log("catData");
  console.log(catData);
  return catData;
}

// returns an array with the percent of answered questions for each building
export function progressForBuildingsArray(buildings, state) {
  let progressArray = [];
  for (let i = 0; i < buildings.length; i++) {
    let n = percentAnswered(buildings[i].id, state);
    progressArray.push(n);
  }
  return progressArray;
}

// export function questionDataPerCategory(buildingId, categoriesArray, state) {
//   let catData = {};

//   for (let category of categoriesArray) {
//     const categoryQuestions = getAllActiveQuestionsForCategory(category.id, buildingId, state);
//     const numUnanswered = getNumUnanswered(categoryQuestions, buildingId, state);
//     const categoryAnswers = getAllActiveAnswersForCategory(category.id, buildingId, state);

//     catData[category.id] = {
//       id: category.id,
//       name: category.name,
//       answered: categoryQuestions.length - numUnanswered,
//       total: categoryQuestions.length,
//       delegations: getDelegations(categoryAnswers, state)
//     };
//   }
//   console.log("catData");
//   console.log(catData);
//   return catData;
// }
