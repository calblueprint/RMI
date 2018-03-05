import {
  FETCH_SUCCESS,
  FETCH_FAILURE,
  FETCH_IN_PROGRESS,
  FETCH_SETTINGS,
  FETCHING_ANSWER,
  UPDATE_ANSWER,
  REMOVE_ANSWER,
} from '../constants';
import { post, patch } from '../fetch/requester';

export function createAnswer(buildingId, answer) {
  return {
    type: FETCHING_ANSWER,
    status: FETCH_IN_PROGRESS,
    buildingId,
    answer
  };
}

function updateAnswer(response) {
  return {
    type: UPDATE_ANSWER,
    status: FETCH_SUCCESS,
    response
  };
}

function saveError(error) {
  return {
    type: UPDATE_ANSWER,
    status: FETCH_FAILURE,
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
export async function addAnswer(buildingId, answer, dispatch) {
  dispatch(createAnswer(buildingId, answer));

  try {
    let response = await post('/api/answers', {'answer': answer});
    dispatch(updateAnswer(response.data));
  } catch (error) {
    dispatch(saveError(error));
  }
}

/**
 * For answers that already exist in the database.
 */
export async function editAnswer(buildingId, answer, dispatch) {
  dispatch(createAnswer(buildingId, answer));

  try {
    let response = await patch('/api/answers/' + answer.id, {'answer': answer});
    dispatch(updateAnswer(response.data));
  } catch (error) {
    dispatch(saveError(error));
  }
}
