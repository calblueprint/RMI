import {
  ANSWER_FETCH_IN_PROGRESS,
  ANSWER_FETCH_SUCCESS,
  ANSWER_FETCH_FAILURE,
  ADD_ANSWERS,
  ADD_DELEGATIONS,
  FETCH_IN_PROGRESS,
  PRE_FETCH_SAVE,
  FETCH_SUCCESS,
  FETCH_FAILURE,
  UPDATE_LOCAL_ANSWER
} from "../constants";

/**
 * Updates the answer in store -- at this point we are not fetching anything,
 * and the answer has not been saved remotely.
 */
function updateLocalAnswer(state, action) {
  const buildingId = action.buildingId;
  const answer = action.answer;

  return {
    ...state,
    [answer.question_id]: {
      ...state[answer.question_id],
      ...answer,
      fetchStatus: PRE_FETCH_SAVE,
      buildingId: buildingId
    }
  };
}

/**
 * Sets the "fetching" flag to true to indicate that the save is currently in progress.
 */
function beforeFetchAnswer(state, action) {
  const answer = action.answer;

  return {
    ...state,
    [answer.question_id]: {
      ...state[answer.question_id],
      ...answer,
      fetchStatus: FETCH_IN_PROGRESS
    }
  };
}

/**
 * Upon receiving a response from the fetch request, modify the updated_at time and save status,
 * but don't change the answer itself. The reason for this is because we're debouncing fetch requests
 * for certain input types, so we want to keep the local answer as the most up-to-date one.
 */
function answerFetchSuccess(state, action) {
  const answer = action.response;
  const localAnswer = state[answer.question_id];

  return {
    ...state,
    [answer.question_id]: {
      ...answer,
      ...localAnswer,
      updated_at: answer.updated_at || localAnswer.updated_at,
      fetchStatus: FETCH_SUCCESS,
      error: null
    }
  };
}

/**
 * Updates the answer in store with the response received from the fetch request.
 */
function answerFetchFailure(state, action) {
  const errorMessage = action.response;

  return {
    ...state,
    [action.questionId]: {
      ...state[action.questionId],
      fetchStatus: FETCH_FAILURE,
      error: errorMessage
    }
  };
}

/**
 * Adds answers from batch creation
 */
export function addAnswers(state, action) {
  return {
    ...state,
    [action.buildingId]: {
      answers: action.answers
    }
  };
}

/**
 * Adds delegations, which updates answers in the redux store with delegation information
 */
export function addDelegations(state, action) {
  return {
    ...state,
    [action.buildingId]: {
      answers: action.answers
    }
  };
}

export function answers(state = {}, action) {
  if (!action) return state;
  switch (action.type) {
    case UPDATE_LOCAL_ANSWER:
      return updateLocalAnswer(state, action);
    case ANSWER_FETCH_IN_PROGRESS:
      return beforeFetchAnswer(state, action);
    case ANSWER_FETCH_SUCCESS:
      return answerFetchSuccess(state, action);
    case ANSWER_FETCH_FAILURE:
      return answerFetchFailure(state, action);
    case ADD_ANSWERS:
      return addAnswers(state, action);
    case ADD_DELEGATIONS:
      return addDelegations(state, action);
    default:
      return state;
  }
}
