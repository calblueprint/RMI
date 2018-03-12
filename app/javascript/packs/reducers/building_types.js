import {
  CREATE_UNSAVED_QUESTION
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

export default function building_types(state = {}, action) {
  if (!action) return state;
  switch (action.type) {
    case CREATE_UNSAVED_QUESTION: return beforeCreateQuestion(state, action);
    default:
      return state;
  }
}
