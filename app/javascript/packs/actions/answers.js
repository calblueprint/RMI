import {
  FETCH_SUCCESS,
  FETCH_FAILURE,
  FETCH_IN_PROGRESS,
  FETCH_SETTINGS,
  FETCH_ANSWER,
  CREATE_ANSWER,
  UPDATE_ANSWER,
  REMOVE_ANSWER,
} from '../constants';

export function createAnswer(buildingId) {
  return {
    type: CREATE_ANSWER,
    status: FETCH_IN_PROGRESS,
    buildingId: buildingId
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
 * Updates the answer in store and sends a fetch request.
 *
 * @param buildingId    id of building the answer belongs to
 * @param answer        A hash that contains all params required by the Answers API controller
 * @param dispatch      The dispatch function
 */
export async function addAnswer(buildingId, answer, dispatch) {
  try {
    const answerData = JSON.stringify({
      answer
    });

    let response = await fetch('/api/answers', {
      method: 'POST',
      body: answerData,
      headers: {
        "X-CSRF-Token": document.querySelector("meta[name='csrf-token']").content,
        "Content-Type": "application/json"
      },
      credentials: 'same-origin'
    }).then(resp => resp.json());

    dispatch(updateAnswer(response.data));
  } catch (error) {
    dispatch(saveError(error));
  }
}
