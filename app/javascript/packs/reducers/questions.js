import {
  ADD_QUESTION,
  ADD_OPTION,
  EDIT_QUESTION,
  EDIT_OPTION,
  REMOVE_QUESTION,
  REMOVE_OPTION,
  SAVE_QUESTION
} from '../constants';

function attachQuestion(state, action) {
  const questionId = action.question.id;
  return {
    ...state,
    [questionId]: {
      saved: false,
      ...action.question
    }
  }
}

function attachOptionToQuestion(state, action) {
  const questionId = action.question.id;
  return {
    ...state,
    [questionId]: {
      options: [
        action.option.id,
        ...state[questionId].options
      ]
    }
  }
}

function detachQuestion(state, action) {
  return Object.keys(state)
    .filter(id => id !== action.question.id)
    .reduce((newState, id) => {
      newState[id] = state[id];
      return newState
    }, {});
}

function detachOptionFromQuestion(state, action) {
  const currentOptions = state[questionId].options;
  return {
    ...state,
    [questionId]: {
      options: currentOptions.filter(id => id !== action.option.id)
    }
  }
}

function saveQuestion(state, action) {
  const questionId = action.question.id;
  return {
    ...state,
    [questionId]: {
      saved: true
    }
  }
}

export default function questions(state = {}, action) {
  if (!action) return state;
  switch (action.type) {
    case ADD_QUESTION: return attachQuestion(state, action);
    case EDIT_QUESTION: return attachQuestion(state, action);
    case ADD_OPTION: return attachOptionToQuestion(state, action);
    case REMOVE_QUESTION: return detachQuestion(state, action);
    case REMOVE_OPTION: return detachOptionFromQuestion(state, action);
    case SAVE_QUESTION: return saveQuestion(state, action);
  default:
    return state;
  }
}
