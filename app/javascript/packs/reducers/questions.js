import {
  ADD_QUESTION,
  ADD_OPTION,
  EDIT_QUESTION,
  EDIT_OPTION,
  REMOVE_QUESTION,
  REMOVE_OPTION,
  SAVE_QUESTION,
  OPTION_FETCH_IN_PROGRESS,
  UPDATE_LOCAL_OPTION,
  QUESTION_FETCH_IN_PROGRESS,
  UPDATE_LOCAL_QUESTION,
  CREATE_UNSAVED_QUESTION,
  QUESTION_FETCH_SUCCESS,
  QUESTION_FETCH_FAILURE,
  CREATE_UNSAVED_OPTION,
  OPTION_FETCH_FAILURE,
  OPTION_FETCH_SUCCESS
} from '../constants';

function detachQuestion(state, action) {
  return Object.keys(state)
    .filter(id => id !== action.question.id)
    .reduce((newState, id) => {
      newState[id] = state[id];
      return newState
    }, {});
}


function beforeFetchQuestion(state, action) {
  const questionId = action.question.id;
  return {
    ...state,
    [questionId]: {
      ...state[questionId],
      fetchStatus: action.fetchStatus
    }
  }
}



function beforeCreateQuestion(state, action) {
  const questionId = action.question.id;
  return {
    ...state,
    [questionId]: {
      ...action.question,
      fetchStatus: action.fetchStatus,
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
      fetchStatus: action.fetchStatus,
      temp: false
    }
  }
}

function questionFetchFailure(state, action) {
  const questionId = action.question.id;
  return {
    ...state,
    [questionId]: {
      ...action.question,
      fetchStatus: action.fetchStatus,
      error: action.error
    }
  }
}

function optionFetchSuccess(state, action) {
  const questionId = action.response.question_id;
  const optionId = action.response.id;
  return {
    ...state,
    [questionId]: {
      ...state[questionId],
      options: {
        ...state[questionId].options,
        [optionId]:{
          ...action.response,
          fetchStatus: action.fetchStatus,
        }
      }
    }
  }
}

function optionFetchFailure(state, action) {
  const questionId = action.option.question_id;
  const optionId = action.option.id;
  return {
    ...state,
    [questionId]: {
      ...state[questionId],
      options: {
        ...state[questionId].options,
        [optionId]: {
          ...action.option,
          error: action.error,
          fetchStatus: action.fetchStatus
        }
      }
    }
  }
}

function beforeCreateOption(state, action) {
  const questionId = action.option.question_id;
  const optionId = action.option.id;
  return {
    ...state,
    [questionId]: {
      ...state[questionId],
      fetchStatus: action.fetchStatus,
      options: {
        ...state[questionId].options,
        [optionId]: {
          ...action.option,
          temp: true
        }
      }
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
      fetchStatus: action.fetchStatus,
      options: {
        ...state[questionId].options,
        [optionId]: action.option
      }
    }
  }
}

function detachOptionFromQuestion(state, action) {
  const questionId = action.option.question_id;
  const currentOptions = state[questionId].options;
  return {
    ...state,
    [questionId]: {
      ...state[questionId],
      options: Object.keys(currentOptions)
        .filter(id => id !== action.option.id)
        .reduce((newOptions, id) => {
          newOptions[id] = currentOptions[id];
          return newOptions
        }, {}),
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


export default function questions(state = {}, action) {
  if (!action) return state;
  switch (action.type) {
    //option
    case ADD_OPTION: return attachOptionToQuestion(state, action);
    case OPTION_FETCH_SUCCESS: return optionFetchSuccess(state, action);
    case OPTION_FETCH_FAILURE: return optionFetchFailure(state, action);
    case CREATE_UNSAVED_OPTION: return beforeCreateOption(state, action);
    case REMOVE_OPTION: return detachOptionFromQuestion(state, action);
    case OPTION_FETCH_IN_PROGRESS: return beforeFetchOption(state, action);
    case UPDATE_LOCAL_OPTION: return beforeFetchOption(state, action);
    //question
    case UPDATE_LOCAL_QUESTION: return beforeFetchQuestion(state, action);
    case CREATE_UNSAVED_QUESTION: return beforeCreateQuestion(state, action);
    case QUESTION_FETCH_IN_PROGRESS: return beforeFetchQuestion(state, action);
    case REMOVE_QUESTION: return detachQuestion(state, action);
    case QUESTION_FETCH_SUCCESS: return questionFetchSuccess(state, action);
    case QUESTION_FETCH_FAILURE: return questionFetchFailure(state, action);

  default:
    return state;
  }
}
