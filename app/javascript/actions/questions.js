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
  REMOVE_QUESTION,
  DELETE_SUCCESS,
  DELETE_FAILURE,
  DELETE_IN_PROGRESS,
  QUESTION_DELETE_SUCCESS,
  QUESTION_DELETE_FAILURE,
  QUESTION_DELETE_IN_PROGRESS,
  QUESTION_SET_NEW
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

export function questionSetNew(question) {
  return {
    type: QUESTION_SET_NEW,
    question
  }
}

export function questionFetchFailure(error, question) {
  return {
    type: QUESTION_FETCH_FAILURE,
    fetchStatus: FETCH_FAILURE,
    building_type_id: question.building_type_id,
    error,
    question
  };
}

export function questionDeleteSuccess(question) {
  return {
    type: QUESTION_DELETE_SUCCESS,
    deleteStatus: DELETE_SUCCESS,
    building_type_id: question.building_type_id,
    question
  };
}

 export function questionDeleteFailure(error, question) {
  return {
    type: QUESTION_DELETE_FAILURE,
    deleteStatus: DELETE_FAILURE,
    building_type_id: question.building_type_id,
    error,
    question
  };
}

 export function questionDeleteInProgress(question) {
  return {
    type: QUESTION_DELETE_IN_PROGRESS,
    deleteStatus: DELETE_IN_PROGRESS,
    question
  }
}

export function removeQuestion(question) {
  return {
    type: REMOVE_QUESTION,
    question
  }
}
