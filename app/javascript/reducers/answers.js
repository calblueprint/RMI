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
  UPDATE_LOCAL_ANSWER,
  DELETE_LOCAL_ANSWER
} from "../constants";

const EMPTY_ANSWER = {
  text: "",
  building_id: -1,
  question_id: -1,
  selected_option_id: null,
  attachment_file_name: "",
  attachment_content_type: "",
  attachment_file_size: "",
  attachment_updated_at: "",
  delegation_email: "",
  delegation_first_name: "",
  delegation_last_name: ""
};
>>>>>>> upstream/master

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
      ...(state[answer.question_id] || EMPTY_ANSWER),
      ...answer,
      fetchStatus: PRE_FETCH_SAVE,
      buildingId: buildingId
    }
  };
}
<<<<<<< HEAD
=======

function removeLocalAnswer(state, action) {
  const answer = action.answer;
  return {
    ...state,
    [answer.question_id]: {
      ...state[answer.question_id],
      text: "",
      attachment_file_name: ""
    }
  };
}
>>>>>>> upstream/master

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
  ...action.answers
};
}


export function answers(state = {}, action) {
  if (!action) return state;
  switch (action.type) {
    case UPDATE_LOCAL_ANSWER:
      return updateLocalAnswer(state, action);
<<<<<<< HEAD
=======
    case DELETE_LOCAL_ANSWER:
      return removeLocalAnswer(state, action);
>>>>>>> upstream/master
    case ANSWER_FETCH_IN_PROGRESS:
      return beforeFetchAnswer(state, action);
    case ANSWER_FETCH_SUCCESS:
      return answerFetchSuccess(state, action);
    case ANSWER_FETCH_FAILURE:
      return answerFetchFailure(state, action);
<<<<<<< HEAD
    case ADD_ANSWERS || ADD_DELEGATIONS:
      return addAnswers(state, action);
=======
>>>>>>> upstream/master
    default:
      return state;
  }
}
