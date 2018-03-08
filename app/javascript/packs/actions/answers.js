import {
  FETCH_SUCCESS,
  FETCH_FAILURE,
  FETCH_IN_PROGRESS,
  FETCH_SETTINGS,
  ANSWER_FETCH_IN_PROGRESS,
  ANSWER_FETCH_SUCCESS,
  ANSWER_FETCH_FAILURE,
  REMOVE_ANSWER,
} from '../constants';
import { post, patch } from '../fetch/requester';

export function answerFetchInProgress(buildingId, answer) {
  return {
    type: ANSWER_FETCH_IN_PROGRESS,
    status: FETCH_IN_PROGRESS,
    buildingId,
    answer
  };
}

function answerFetchSuccess(response) {
  return {
    type: ANSWER_FETCH_SUCCESS,
    status: FETCH_SUCCESS,
    buildingId: response.building_id,
    response
  };
}

function answerFetchFailure(error) {
  return {
    type: ANSWER_FETCH_FAILURE,
    status: FETCH_FAILURE,
    buildingId: error.building_id,
    response: error
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
    let response = await post('/api/answers', {'answer': answer});
    dispatch(answerFetchSuccess(response.data));
  } catch (error) {
    dispatch(answerFetchFailure(error));
  }
}

/**
 * For answers that already exist in the database.
 */
export async function updateAnswer(buildingId, answer, dispatch) {
  dispatch(answerFetchInProgress(buildingId, answer));

  try {
    let response = await patch('/api/answers/' + answer.id, {'answer': answer});
    dispatch(answerFetchSuccess(response.data));
  } catch (error) {
    dispatch(answerFetchFailure(error));
  }
}
