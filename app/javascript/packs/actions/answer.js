import {
  FETCH_ANSWER,
  ADD_ANSWER,
  CREATE_ANSWER,
  UPDATE_ANSWER,
  REMOVE_ANSWER,
  SAVE_ANSWER,
  FETCH_SUCCESS,
  FETCH_FAILURE,
  FETCH_IN_PROGRESS,
  FETCH_SETTINGS
} from "../constants/index";

export function createAnswer(buildingId) {
  return {
    type: CREATE_ANSWER,
    status: FETCH_IN_PROGRESS,
    buildingId: buildingId
  };
}

export function updateAnswer() {
  return {
    type: UPDATE_ANSWER,
    portfolioId
  };
}

function saveAnswer(type, response) {
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

    dispatch(updateAnswer());
    dispatch(saveAnswer(ADD_ANSWER, response.data));
  } catch (error) {
    dispatch(saveError(CREATE_ANSWER, error));
  }
}
