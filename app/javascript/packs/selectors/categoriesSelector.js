//takes in an entity to check that we are in a specific building and returns the categories associated with a specific building
import { getQuestionsByCategory } from "../utils/QuestionsFilter";
import { getRemainingAnswersforCategory } from "./answersSelector";

export function getCategoriesForBuilding(buildingId, state) {
  //we only want the categories associated with a specific building
  return Object.keys(state.categories).filter(id => {
    return state.categories[id].building_type_id == state.buildings[buildingId].building_type_id
  }).map(id => {
    return state.categories[id]
  })
}

//returns the category that we are viewing currently
export function getCurrentCategory(cId, state) {
  return state.categories[cId];
}

// takes in a list of categories for a user
// also takes in a building and its respective questions for filtering
// loops through the categories and outputs the first category that has more than 0 unanswered questions
export function getFirstUnansweredCategory(categories, questions, buildingId, state) {
  for (let currCategory in categories) {
    let cQuestions = getQuestionsByCategory(categories[currCategory].id, questions);
    if (getRemainingAnswersforCategory(cQuestions, buildingId, state) > 0) {
      return currCategory;
    }
  }
  return null;
}
