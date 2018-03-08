import {
  FETCH_IN_PROGRESS,
  OPTION_FETCH_IN_PROGRESS,
  OPTION_SAVE_IN_PROGRESS,
  PRE_FETCH_SAVE
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
