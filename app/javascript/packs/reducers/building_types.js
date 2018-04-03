import {
  CREATE_UNSAVED_QUESTION, QUESTION_FETCH_SUCCESS, REMOVE_QUESTION
} from '../constants';

function beforeCreateQuestion(state, action) {
  const buildingTypeId = action.question.building_type_id;
  if (state[buildingTypeId].questions.includes(action.question.id)) {
    return state
  } else {
    return {
      ...state,
      [buildingTypeId]: {
        ...state[buildingTypeId],
        questions: [...state[buildingTypeId].questions, action.question.id]
      }
    }
  }
}

function removeQuestion(state, action) {
  const buildingTypeId = action.question.building_type_id;
  const filteredQuestions = state[buildingTypeId].questions.filter(
    questionId => questionId != action.question.id
  );
  return {
    ...state,
    [buildingTypeId] : {
      ...state[buildingTypeId],
      questions: filteredQuestions
    }
  }
}

function addQuestionId(state, action) {
  const buildingTypeId = action.response.building_type_id;
  const questionId = action.response.id.toString();
  if (state[buildingTypeId].questions.includes(questionId)) {
    return state
  }

  return {
    ...state,
    [buildingTypeId] : {
      ...state[buildingTypeId],
      questions: [...state[buildingTypeId].questions, questionId]
    }
  }
}

export default function building_types(state = {}, action) {
  if (!action) return state;
  switch (action.type) {
    case CREATE_UNSAVED_QUESTION: return beforeCreateQuestion(state, action);
    case REMOVE_QUESTION: return removeQuestion(state, action);
    case QUESTION_FETCH_SUCCESS: return addQuestionId(state, action);
    default:
      return state;
  }
}
