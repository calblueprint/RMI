import {
  DELEGATION_FETCH_IN_PROGRESS,
  DELEGATION_FETCH_SUCCESS,
  DELEGATION_FETCH_FAILURE,
  FETCH_SUCCESS,
  FETCH_FAILURE,
  FETCH_IN_PROGRESS
} from "../constants";
import { updateLocalAnswer } from "./answers";
import { post } from "../fetch/requester";

function delegationFetchInProgress(buildingId) {
  return {
    type: DELEGATION_FETCH_IN_PROGRESS,
    fetchStatus: FETCH_IN_PROGRESS,
    buildingId
  };
}

function delegationFetchSuccess(buildingId, delegations) {
  return {
    type: DELEGATION_FETCH_SUCCESS,
    fetchStatus: FETCH_SUCCESS,
    buildingId,
    delegations
  };
}

function delegationFetchFailure(buildingId, error) {
  return {
    type: DELEGATION_FETCH_FAILURE,
    fetchStatus: FETCH_FAILURE,
    buildingId,
    error
  };
}

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
 */
export async function delegateAllQuestions(
  answers,
  buildingId,
  email,
  firstName,
  lastName,
  dispatch
) {
  const assignedAnswers = Object.values(answers).reduce((assigned, answer) => {
    assigned[answer.question_id] = {
      ...answer,
      delegation_email: email,
      delegation_first_name: firstName,
      delegation_last_name: lastName
    };
    return assigned;
  }, {});
  return delegateQuestions(assignedAnswers, buildingId, dispatch);
}

export async function delegateQuestions(answers, buildingId, dispatch) {
  dispatch(delegationFetchInProgress(buildingId));

  try {
    let delegationRequests = [];
    for (const answer of Object.values(answers)) {
      let delegation = {
        email: answer.delegation_email,
        first_name: answer.delegation_first_name,
        last_name: answer.delegation_last_name,
        answer_id: answer.id
      };
      delegationRequests.push(delegation);
    }
    console.log(delegationRequests);
    let response = await post("/api/delegations", {
      delegations: delegationRequests
    });
    const { answers: receivedAnswers, delegations } = response.data;
    dispatch(delegationFetchSuccess(buildingId, delegations));
    Object.values(receivedAnswers).forEach(answer => {
      dispatch(updateLocalAnswer(buildingId, answer));
    });
  } catch (error) {
    dispatch(delegationFetchFailure(buildingId, error));
  }
}
