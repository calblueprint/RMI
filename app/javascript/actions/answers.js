import {
  FETCH_SUCCESS,
  FETCH_FAILURE,
  FETCH_IN_PROGRESS,
  FETCH_SETTINGS,
  ANSWER_FETCH_IN_PROGRESS,
  ANSWER_FETCH_SUCCESS,
  ANSWER_FETCH_FAILURE,
  UPDATE_LOCAL_ANSWER,
  ADD_ANSWERS,
  ADD_DELEGATIONS,
  REMOVE_ANSWER,
  DELETE_LOCAL_ANSWER
} from "../constants";
import { post, postFile, patch, destroy } from "../fetch/requester";

export const EMPTY_ANSWER = {
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

function answerFetchInProgress(buildingId, answer) {
  return {
    type: ANSWER_FETCH_IN_PROGRESS,
    fetchStatus: FETCH_IN_PROGRESS,
    buildingId,
    answer
  };
}

function answerFetchSuccess(response) {
  return {
    type: ANSWER_FETCH_SUCCESS,
    fetchStatus: FETCH_SUCCESS,
    buildingId: response.building_id,
    response
  };
}

function answerFetchFailure(buildingId, questionId, error) {
  return {
    type: ANSWER_FETCH_FAILURE,
    fetchStatus: FETCH_FAILURE,
    response: error,
    buildingId,
    questionId
  };
}

export function addAnswers(answers, buildingId) {
  return {
    type: ADD_ANSWERS,
    answers,
    buildingId
  };
}

export function updateLocalAnswer(buildingId, answer) {
  return {
    type: UPDATE_LOCAL_ANSWER,
    buildingId,
    answer
  };
}

export function removeLocalAnswer(buildingId, answer) {
  return {
    type: DELETE_LOCAL_ANSWER,
    buildingId,
    answer
  };
}

/**
 * Creates a new answer in the database,
 * updates the answer in store and sends a fetch request.
 *
 * @param buildingId    id of building the answer belongs to
 * @param answer        A hash that contains all params required by the Answers API controller
 * @param dispatch      The dispatch function
 */
export async function createAnswer(buildingId, answer, dispatch) {
  dispatch(answerFetchInProgress(buildingId, answer));

  try {
    let response = await post("/api/answers", { answer: answer });
    dispatch(answerFetchSuccess(response.data));
  } catch (error) {
    dispatch(answerFetchFailure(buildingId, answer.question_id, error));
  }
}

/**
 * For answers that already exist in the database.
 */
export async function updateAnswer(buildingId, answer, dispatch) {
  dispatch(answerFetchInProgress(buildingId, answer));

  try {
    let response = await patch("/api/answers/" + answer.id, { answer: answer });
    dispatch(answerFetchSuccess(response.data));
  } catch (error) {
    dispatch(answerFetchFailure(buildingId, answer.question_id, error));
  }
}

export async function uploadFile(buildingId, questionId, file, dispatch) {
  dispatch(answerFetchInProgress(buildingId, { question_id: questionId }));

  const formData = new FormData();
  formData.append("answer[attachment]", file);
  formData.append("answer[building_id]", buildingId);
  formData.append("answer[question_id]", questionId);
  try {
    let response = await postFile("/api/answers", formData);
    dispatch(updateLocalAnswer(buildingId, response.data));
    dispatch(answerFetchSuccess(response.data));
  } catch (error) {
    dispatch(answerFetchFailure(buildingId, questionId, error));
  }
}

export async function deleteFile(buildingId, answer, dispatch) {
  // Get rid of the attachment name locally to give the user the appearance that it was deleted
  // immediately. However, we need wait for the DELETE request to go through to be fully finished
  dispatch(
    updateLocalAnswer(buildingId, {
      ...answer,
      attachment_file_name: undefined
    })
  );

  try {
    let response = await destroy("/api/answers/" + answer.id + "/attachment");
    dispatch(updateLocalAnswer(buildingId, response.data));
    dispatch(answerFetchSuccess(response.data));
  } catch (error) {
    dispatch(answerFetchFailure(buildingId, answer.question_id, error));
  }
}
