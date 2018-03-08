import {
  ADD_QUESTION,
  ADD_OPTION,
  EDIT_QUESTION,
  EDIT_OPTION,
  REMOVE_QUESTION,
  REMOVE_OPTION,
  FETCH_IN_PROGRESS,
  QUESTION_FETCH_IN_PROGRESS,
  QUESTION_SAVE_IN_PROGRESS,
  PRE_FETCH_SAVE
} from '../constants';

export function addQuestion(text) {
  return {
    type: ADD_QUESTION,
    question: {
      text
    }
  }
}

export function editQuestion() {

}

export function questionFetchInProgress(option) {
  return {
    type: QUESTION_FETCH_IN_PROGRESS,
    status: FETCH_IN_PROGRESS,
    fetching: true,
    option
  }
}

export function questionPreFetchSave(option) {
  return {
    type: QUESTION_SAVE_IN_PROGRESS,
    fetching: false,
    status: PRE_FETCH_SAVE,
    option
  }
}

