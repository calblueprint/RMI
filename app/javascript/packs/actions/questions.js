import {
  FETCH_IN_PROGRESS,
  QUESTION_FETCH_IN_PROGRESS,
  UPDATE_LOCAL_QUESTION,
  PRE_FETCH_SAVE,
  CREATE_UNSAVED_QUESTION,
  FETCH_FAILURE,
  FETCH_SUCCESS,
  QUESTION_FETCH_FAILURE,
  QUESTION_FETCH_SUCCESS,
  REMOVE_QUESTION
} from '../constants';


export function questionFetchInProgress(question) {
  return {
    type: QUESTION_FETCH_IN_PROGRESS,
    fetchStatus: FETCH_IN_PROGRESS,
    question
  }
}

export function questionPreFetchSave(question) {
  return {
    type: UPDATE_LOCAL_QUESTION,
    fetchStatus: PRE_FETCH_SAVE,
    question
  }
}

export function beforeCreateNewQuestion(question) {
  return {
    type: CREATE_UNSAVED_QUESTION,
    fetchStatus: PRE_FETCH_SAVE,
    question
  }
}

export function questionFetchSuccess(response) {
  return {
    type: QUESTION_FETCH_SUCCESS,
    fetchStatus: FETCH_SUCCESS,
    building_type_id: response.building_type_id,
    response
  };
}

export function questionFetchFailure(error) {
  return {
    type: QUESTION_FETCH_FAILURE,
    fetchStatus: FETCH_FAILURE,
    building_type_id: error.building_type_id,
    response: error
  };
}

export function removeQuestion(question) {
  return {
    type: REMOVE_QUESTION,
    question
  }
}

