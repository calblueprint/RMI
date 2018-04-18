import {
  CREATE_UNSAVED_CATEGORY,
  CATEGORY_FETCH_FAILURE,
  CATEGORY_FETCH_IN_PROGRESS,
  CATEGORY_FETCH_SUCCESS,
  REMOVE_CATEGORY,
  UPDATE_LOCAL_CATEGORY, QUESTION_FETCH_SUCCESS, CREATE_UNSAVED_QUESTION, REMOVE_QUESTION, SET_CATEGORY_TO_NEW
} from '../constants';


function detachCategory(state, action) {
  return Object.keys(state)
    .filter(id => id !== action.category.id)
    .reduce((newState, id) => {
      newState[id] = state[id];
      return newState
    }, {});
}


function beforeFetchCategory(state, action) {
  const categoryId = action.category.id;
  return {
    ...state,
    [categoryId]: {
      ...state[categoryId],
      fetchStatus: action.fetchStatus
    }
  }
}



function beforeCreateCategory(state, action) {
  const categoryId = action.category.id;
  return {
    ...state,
    [categoryId]: {
      ...action.category,
      fetchStatus: action.fetchStatus,
      temp: true
    }
  }
}

function categoryFetchSuccess(state, action) {
  const category = action.response;
  const categoryId = category.id;
  return {
    ...state,
    [categoryId]: {
      ...category,
      fetchStatus: action.fetchStatus,
      new: false
    }
  }
}

function categorySetToNew(state, action) {
  return {
    ...state,
    [action.categoryId]: {
      ...state[action.categoryId],
      new: true
    }
  }
}

function categoryFetchFailure(state, action) {
  const categoryId = action.category.id;
  return {
    ...state,
    [categoryId]: {
      ...action.category,
      fetchStatus: action.fetchStatus,
      error: action.error,
      new: false
    }
  }
}

function beforeCreateQuestion(state, action) {
  const categoryId = action.question.category_id;
  if (state[categoryId].questions.includes(action.question.id)) {
    return state
  } else {
    return {
      ...state,
      [categoryId]: {
        ...state[categoryId],
        questions: [...state[categoryId].questions, action.question.id]
      }
    }
  }
}

function removeQuestion(state, action) {
  const categoryId = action.question.category_id;
  const filteredQuestions = state[categoryId].questions.filter(
    questionId => questionId != action.question.id
  );
  return {
    ...state,
    [categoryId] : {
      ...state[categoryId],
      questions: filteredQuestions
    }
  }
}

function addQuestionId(state, action) {
  const categoryId = action.response.category_id;
  const questionId = action.response.id;
  if (state[categoryId].questions.includes(questionId)) {
    return state
  }

  return {
    ...state,
    [categoryId] : {
      ...state[categoryId],
      questions: [...state[categoryId].questions, questionId]
    }
  }
}



export default function categories(state = {}, action) {
  if (!action) {
    return state;
  }
  switch (action.type) {
    //categories
    case UPDATE_LOCAL_CATEGORY: return beforeFetchCategory(state, action);
    case CREATE_UNSAVED_CATEGORY: return beforeCreateCategory(state, action);
    case CATEGORY_FETCH_IN_PROGRESS: return beforeFetchCategory(state, action);
    case REMOVE_CATEGORY: return detachCategory(state, action);
    case CATEGORY_FETCH_SUCCESS: return categoryFetchSuccess(state, action);
    case CATEGORY_FETCH_FAILURE: return categoryFetchFailure(state, action);
    case SET_CATEGORY_TO_NEW: return categorySetToNew(state, action);
    // questions
    case CREATE_UNSAVED_QUESTION: return beforeCreateQuestion(state, action);
    case REMOVE_QUESTION: return removeQuestion(state, action);
    case QUESTION_FETCH_SUCCESS: return addQuestionId(state, action);
    default:
    return state;
  }
}
