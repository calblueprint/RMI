import {
  ADD_QUESTION,
  ADD_OPTION,
  EDIT_QUESTION,
  EDIT_OPTION,
  REMOVE_QUESTION,
  REMOVE_OPTION,
  SAVE_QUESTION,
  OPTION_FETCH_IN_PROGRESS,
  OPTION_SAVE_IN_PROGRESS,
  QUESTION_FETCH_IN_PROGRESS,
  QUESTION_SAVE_IN_PROGRESS,
  CREATE_UNSAVED_QUESTION,
  QUESTION_FETCH_SUCCESS,
  QUESTION_FETCH_FAILURE

} from '../constants';

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

function beforeFetchQuestion(state, action) {
  const questionId = action.question.id;
  return {
    ...state,
    [questionId]: {
      ...state[questionId],
      saved: false
    }
  }
}

function beforeFetchOption(state, action) {
  const questionId = action.option.question_id;
  const optionId = action.option.id;
  return {
    ...state,
    [questionId]: {
      ...state[questionId],
      fetching: action.fetching,
      saved: false,
      options: {
        ...state[questionId].options,
        [optionId]: action.option
      }
    }
  }
}

function beforeCreateQuestion(state, action) {
  const questionId = action.question.id;
  return {
    ...state,
    [questionId]: {
      ...action.question,
      saved: false,
      temp: true
    }
  }
}

function questionFetchSuccess(state, action) {
  const question = action.response;
  const questionId = question.id;
  return {
    ...state,
    [questionId]: {
      ...question,
      saved: true,
      fetching: false,
    }
  }
}

function questionFetchFailure(state, action) {
  return {
    state
  }
}


export default function questions(state = {}, action) {
  if (!action) return state;
  switch (action.type) {
    case ADD_OPTION: return attachOptionToQuestion(state, action);
    case REMOVE_QUESTION: return detachQuestion(state, action);
    case REMOVE_OPTION: return detachOptionFromQuestion(state, action);
    case SAVE_QUESTION: return saveQuestion(state, action);
    case QUESTION_FETCH_IN_PROGRESS: return beforeFetchQuestion(state, action);
    case QUESTION_SAVE_IN_PROGRESS: return beforeFetchQuestion(state, action);
    case OPTION_FETCH_IN_PROGRESS: return beforeFetchOption(state, action);
    case OPTION_SAVE_IN_PROGRESS: return beforeFetchOption(state, action);
    case CREATE_UNSAVED_QUESTION: return beforeCreateQuestion(state, action);
    case QUESTION_FETCH_SUCCESS: return questionFetchSuccess(state, action);
    case QUESTION_FETCH_FAILURE: return questionFetchFailure(state, action);
  default:
    return state;
  }
}
