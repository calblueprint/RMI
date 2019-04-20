import { post } from "../fetch/requester";
import { getAnswersForBuilding, getAnswersForCategoryAndBuilding } from "../selectors/answersSelector";
import { addAnswers } from "../actions/answers";

/**
 * Assigns all questions to the user with the given email address.
 * (`answers` is provided as a param instead of questions because delegations are tied
 * to answers in the backend. But these are essentially just the blank answers for the questions
 * we want to delegate)
 *
 * @param answers    {object} - a map of question ids to answers (for the questions we want to delegate)
 * @param buildingId {number} - id of the building whose questions to delegate
 * @param email      {string} - email address of user to delegate to
 * @param firstName  {string}
 * @param lastName   {string}
 *
 * @param addAnswers {function} - function to dispatch the appropriate Redux action adding all the
 *                                  updated answers to store once delegation is complete
 */
export async function delegateQuestions(answers, buildingId, email, firstName, lastName, addAnswers) {
  let delegations = [];
  for (const answer of Object.values(answers)) {
    let delegation = {
      email: email,
      first_name: firstName,
      last_name: lastName,
      answer_id: answer.id
    };
    delegations.push(delegation);
  }
  try {
    let response = await post("/api/delegations", { delegations });
    const answersToUpdate = response.data;
    Object.values(answersToUpdate).forEach(a => {
      // TODO 4/18: this is temporary. We should actually be updating whichever field in Redux represents
      // the *actively* assigned user (delegation_email right now is just a temp field)
      a.delegation_email = email;
      a.delegation_first_name = firstName;
      a.delegation_last_name = lastName;
      answersToUpdate[a.question_id] = a;
    });
    addAnswers(answersToUpdate, buildingId);
  } catch (error) {}
}

export async function delegateBuildingQuestions(buildingId, userDetails, state, callbackFn=null) {
  let answers = getAnswersForBuilding(buildingId, state);
  
  await delegateQuestions(answers, buildingId, userDetails.email, userDetails.firstName, userDetails.lastName, addAnswers);
  callbackFn ? callbackFn() : null;
}

export async function delegateCategoryQuestions(categoryId, buildingId, userDetails, state, callbackFn=null) {
  let answers = getAnswersForCategoryAndBuilding(categoryId, buildingId, state);

  await delegateQuestions(answers, buildingId, userDetails.email, userDetails.firstName, userDetails.lastName, addAnswers);
  callbackFn ? callbackFn() : null;
}