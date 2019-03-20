import {
  FETCH_IN_PROGRESS,
  OPTION_FETCH_IN_PROGRESS,
  UPDATE_LOCAL_OPTION,
  PRE_FETCH_SAVE,
  CREATE_UNSAVED_OPTION,
  FETCH_FAILURE,
  FETCH_SUCCESS,
  OPTION_FETCH_FAILURE,
  OPTION_FETCH_SUCCESS,
  OPTION_DELETE_SUCCESS,
  OPTION_DELETE_FAILURE,
  OPTION_DELETE_IN_PROGRESS,
  DELETE_SUCCESS,
  DELETE_FAILURE,
  DELETE_IN_PROGRESS,
  REMOVE_OPTION
} from '../constants';

export function optionFetchInProgress(option) {
  return {
    type: OPTION_FETCH_IN_PROGRESS,
    fetchStatus: FETCH_IN_PROGRESS,
    option
  }
}

export function optionPreFetchSave(option) {
  return {
    type: UPDATE_LOCAL_OPTION,
    fetchStatus: PRE_FETCH_SAVE,
    option
  }
}

export function beforeCreateNewOption(option) {
  return {
    type: CREATE_UNSAVED_OPTION,
    fetchStatus: PRE_FETCH_SAVE,
    option
  }
}

export function optionFetchSuccess(response) {
  return {
    type: OPTION_FETCH_SUCCESS,
    fetchStatus: FETCH_SUCCESS,
    response
  };
}

export function optionFetchFailure(error, option) {
  return {
    type: OPTION_FETCH_FAILURE,
    fetchStatus: FETCH_FAILURE,
    error: error,
    option
  };
}

export function removeOption(option) {
  return {
    type: REMOVE_OPTION,
    option
  }
}

export function optionDeleteSuccess(option) {
  return {
    type: OPTION_DELETE_SUCCESS,
    deleteStatus: DELETE_SUCCESS,
    option
  };
}

export function optionDeleteFailure(error, option) {
  return {
    type: OPTION_DELETE_FAILURE,
    deleteStatus: DELETE_FAILURE,
    error: error,
    option
  };
}

export function optionDeleteInProgress(option) {
  return {
    type: OPTION_DELETE_IN_PROGRESS,
    deleteStatus: DELETE_IN_PROGRESS,
    option
  }
}
