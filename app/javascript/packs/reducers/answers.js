import {
  ANSWER_FETCH_IN_PROGRESS,
  ANSWER_FETCH_SUCCESS,
  ANSWER_FETCH_FAILURE,
} from '../constants';

/**
 * Updates the answer in store with the data that is currently being sent through a fetch request.
 */
function beforeFetchAnswer(state, action) {
  const buildingId = action.buildingId;
  const answer = action.answer;

  return {
    ...state,
    [answer.question_id]: {
      ...answer,
      saved: false,
      fetching: true,
      buildingId: buildingId
    }
  }
}

function answerFetchSuccess(state, action) {
  const answer = action.response;

  return {
    ...state,
    [answer.question_id]: {
      ...answer,
      saved: true,
      fetching: false,
      error: false
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
      error: errorMessage,
      fetching: false
    }
  };
}

export function answers(state = {}, action) {
  if (!action) return state;
  switch (action.type) {
    case ANSWER_FETCH_IN_PROGRESS: return beforeFetchAnswer(state, action);
    case ANSWER_FETCH_SUCCESS: return answerFetchSuccess(state, action);
    case ANSWER_FETCH_FAILURE: return answerFetchFailure(state, action);

  default:
    return state;
  }
}
