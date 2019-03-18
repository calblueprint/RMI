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
  let buildingQuestions = state.buildings[buildingId].questions;

  for (let key in answers) {
    let questionId = answers[key].question_id;
    if (buildingQuestions.includes(String(questionId)) && !(answers[key].text) && !(answers[key].delegation_email)) {
      unanswered += 1;
    }
  }
  return unanswered;
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

export function questionDataPerCategory(buildingId, categoriesArray, state) {
  let catData = {};
  let buildingQuestions = state.buildings[buildingId].questions;

  let answers = state.buildings[buildingId].answers;  

  for (let key in answers) {
    let questionId = answers[key].question_id;
    let question = state.questions[questionId];
    
    if (buildingQuestions.includes(String(questionId))) {

      let categoryId = question.category_id;

      if (!catData[categoryId]) {
        catData[categoryId] = {id: categoryId, 
          name: categoriesArray.filter(cat => {
            return cat.id === categoryId
          })[0].name,
          answered: 0,
          total: 0};
      }
      if ((answers[key].text) || (answers[key].delegation_email)) {
        catData[categoryId].answered += 1; 
      }
      catData[categoryId].total += 1;
    }
  }
  return catData;
}

// returns an array with the percent of answered questions for each building
export function progressForBuildingsArray(buildings, state) {
  let progressArray = [];
  console.log(buildings)
  for (let i = 0; i < buildings.length; i++) {
    console.log(buildings[i].id)
    let n = percentAnswered(buildings[i].id, state)
    progressArray.push(n);
  }
  console.log(progressArray);
  return progressArray;
}