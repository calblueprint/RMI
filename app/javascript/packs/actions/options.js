import {
  FETCH_IN_PROGRESS,
  OPTION_FETCH_IN_PROGRESS,
  OPTION_SAVE_IN_PROGRESS,
  PRE_FETCH_SAVE,
  CREATE_UNSAVED_OPTION,
  FETCH_FAILURE,
  FETCH_SUCCESS,
  OPTION_FETCH_FAILURE,
  OPTION_FETCH_SUCCESS,
  REMOVE_OPTION
} from '../constants';

export function optionFetchInProgress(option) {
  return {
    type: OPTION_FETCH_IN_PROGRESS,
    status: FETCH_IN_PROGRESS,
    fetching: true,
    option
  }
}

export function optionPreFetchSave(option) {
  return {
    type: OPTION_SAVE_IN_PROGRESS,
    fetching: false,
    status: PRE_FETCH_SAVE,
    option
  }
}

export function beforeCreateNewOption(option) {
  return {
    type: CREATE_UNSAVED_OPTION,
    fetching: false,
    status: PRE_FETCH_SAVE,
    option
  }
}

export function optionFetchSuccess(response) {
  return {
    type: OPTION_FETCH_SUCCESS,
    status: FETCH_SUCCESS,
    response
  };
}

export function optionFetchFailure(error) {
  return {
    type: OPTION_FETCH_FAILURE,
    status: FETCH_FAILURE,
    response: error
  };
}

export function removeOption(option) {
  return {
    type: REMOVE_OPTION,
    option
  }
}
