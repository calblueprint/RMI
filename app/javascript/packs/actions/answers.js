import {
  FETCH_SUCCESS,
  FETCH_FAILURE,
  FETCH_IN_PROGRESS,
  FETCH_SETTINGS,
  FETCH_ANSWER,
  CREATE_ANSWER,
  UPDATE_ANSWER,
  REMOVE_ANSWER,
  SAVE_ANSWER
} from '../constants';

export function createAnswer(buildingId) {
  return {
    type: CREATE_ANSWER,
    status: FETCH_IN_PROGRESS,
    buildingId: buildingId,
    questionId: questionId
  };
}

function updateAnswer(type, response) {
  return {
    type,
    status: FETCH_SUCCESS,
    response
  };
}

function saveError(type, error) {
  return {
    type,
    status: FETCH_FAILURE,
    response: error
  };
}


export async function addAnswer(buildingId, answer, dispatch) {
  dispatch(createAnswer(buildingId));

  try {
    const answerData = JSON.stringify({
      ...answer
    });

    let response = await fetch('/api/buildings', {
      method: 'POST',
      data: answerData
    }).then(resp => resp.json());

    dispatch(updateAnswer(UPDATE_ANSWER, response.data));
  } catch (error) {
    dispatch(saveError(CREATE_ANSWER, error));
  }
}
