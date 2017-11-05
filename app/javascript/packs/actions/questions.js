import {
  ADD_QUESTION,
  ADD_OPTION,
  EDIT_QUESTION,
  EDIT_OPTION,
  REMOVE_QUESTION,
  REMOVE_OPTION
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
