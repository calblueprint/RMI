import {
  FETCH_ANSWER,
  ADD_ANSWER,
  EDIT_ANSWER,
  REMOVE_ANSWER,
  SAVE_ANSWER, CREATE_ANSWER
} from "../constants/index";

function createAnswer(state, action) {
  const tempId = '__unsaved__' + Date.now();
  const buildingId = action.buildingId;
  return {
    ...state,
    [buildingId]: {
      ...state[buildingId],
      [tempId]: {
        saved: false,
        buildingId: buildingId,
        questionId: action.questionId
      }
    }
  }
}

function updateAnswer(state, action) {
    
}

function removeAnswer(state, action) {

}

function saveAnswer(state, action) {
  const buildingId = action.buildingId
}

export default function answers(state = {}, action) {
  if (!action) return state;
  switch (action.type) {
    case CREATE_ANSWER: return createAnswer(state, action);
    case EDIT_ANSWER: return updateAnswer(state, action);
    case REMOVE_ANSWER: return removeAnswer(state, action);
    case SAVE_ANSWER: return saveAnswer(state, action);
    default:
      return state;
  }
}

// state = {
//  1: {
//   bId:
//   answers: {}
//  }
// }
//
// { ...state,
//   [id]: {
//      ...state[id],
//      answers: {
//      ...state[id].answers
//      }
//   }
// }