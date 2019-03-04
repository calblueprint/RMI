import {
  CREATE_UNSAVED_QUESTION, QUESTION_FETCH_SUCCESS, REMOVE_QUESTION,
  CREATE_UNSAVED_CATEGORY, CATEGORY_FETCH_SUCCESS, REMOVE_CATEGORY,
  ADD_BUILDING_TYPE
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


function beforeCreateCategory(state, action) {
  const buildingTypeId = action.category.building_type_id;
  if (state[buildingTypeId].questions.includes(action.category.id)) {
    return state
  } else {
    return {
      ...state,
      [buildingTypeId]: {
        ...state[buildingTypeId],
        categories: [...state[buildingTypeId].categories, action.category.id]
      }
    }
  }
}

function removeCategory(state, action) {
  const buildingTypeId = action.category.building_type_id;
  const filteredCategories = state[buildingTypeId].categories.filter(
    categoryId => categoryId != action.category.id
  );
  return {
    ...state,
    [buildingTypeId] : {
      ...state[buildingTypeId],
      categories: filteredCategories
    }
  }
}

function addCategoryId(state, action) {
  const buildingTypeId = action.response.building_type_id;
  const categoryId = action.response.id;
  if (state[buildingTypeId].categories.includes(categoryId)) {
    return state
  }

  return {
    ...state,
    [buildingTypeId] : {
      ...state[buildingTypeId],
      categories: [...state[buildingTypeId].categories, categoryId]
    }
  }
}

function addBuildingType(state, action) {
  console.log("addBuilding Reached");
  const buildingTypeId = action.building_type_id;
  console.log(state);
  if (buildingTypeId in state) {
    return state
  }

  return {
    ...state,
    [buildingTypeId] : {
      ...state[buildingTypeId],
    }
  }
}

export default function building_types(state = {}, action) {
  if (!action) return state;
  switch (action.type) {
    //questions
    case CREATE_UNSAVED_QUESTION: return beforeCreateQuestion(state, action);
    case REMOVE_QUESTION: return removeQuestion(state, action);
    case QUESTION_FETCH_SUCCESS: return addQuestionId(state, action);
    //categories
    case CREATE_UNSAVED_CATEGORY: return beforeCreateCategory(state, action);
    case REMOVE_CATEGORY: return removeCategory(state, action);
    case CATEGORY_FETCH_SUCCESS: return addCategoryId(state, action);
    //building type
    case ADD_BUILDING_TYPE: return addBuildingType(state, action);
    default:
      return state;
  }
}
