import {
  ADD_BUILDING,
  EDIT_BUILDING,
  CREATE_BUILDING,
  UPDATE_BUILDING,
  REMOVE_BUILDING,
  SAVE_BUILDING,
  ASSIGN_BUILDING_OPERATOR,
  UNASSIGN_BUILDING_OPERATOR,
  FETCH_SUCCESS,
  FETCH_FAILURE,
  CREATE_ANSWER,
  UPDATE_ANSWER,
  REMOVE_ANSWER,
} from '../constants';

  /////////////////////////////////////////////////////////////////
 // BUILDINGS ////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////

function addBuilding(state, action) {
  const tempId = '__unsaved__' + Date.now();
  return {
    ...state,
    [tempId]: {
      saved: false,
      portfolioId: action.portfolioId
    }
  };
}

function editBuilding(state, action) {
  const id = action.buildingId;
  return {
    ...state,
    [id]: {
      ...action.building,
      saved: false
    }
  };
}

function removeBuilding(state, action) {
  return Object.keys(state)
    .filter(id => id !== action.buildingId)
    .reduce((newState, id) => {
      newState[id] = state[id];
      return newState
    }, {});
}

function saveBuilding(state, action) {
  const id = action.buildingId;
  const status = action.status;

  if (status === FETCH_SUCCESS) {
    const receivedBuilding = action.response;
    return {
      ...state,
      [receivedBuilding.id]: {
          ...receivedBuilding,
        saved: true,
        fetching: false,
        error: false
      }
    };
  }

  if (status === FETCH_FAILURE) {
    const errorMessage = action.response;
    return {
      ...state,
      [id]: {
        error: errorMessage,
        fetching: false
      }
    };
  }

  return {
    ...state,
    [id]: {
      fetching: true
    }
  };
}

  /////////////////////////////////////////////////////////////////
 // ANSWERS //////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////

function createAnswer(state, action) {
  const tempId = '__unsaved__' + Date.now();
  const buildingId = action.buildingId;
  return {
    ...state,
    [buildingId]: {
      ...state[buildingId],
      answers: {
        ...state[buildingId]['answers'],
        [tempId]: {
          saved: false,
          fetching: true,
          buildingId: buildingId,
          questionId: action.questionId
        }
      },
    }
  };
}

function updateAnswer(state, action) {
  const buildingId = action.buildingId;
  const status = action.status;
  const answer = action.response;

  if (status === FETCH_SUCCESS) {
    return {
      ...state,
      [buildingId]: {
        ...state[buildingId],
        answers: {
          ...state[buildingId]['answers'],
          [answer.id]: {
            ...state[buildingId]['answers'][answer.id],
            saved: true,
            fetching: false,
            error: false
          }
        }
      }
    }
  }

  if (status === FETCH_FAILURE) {
    const errorMessage = action.response;
    const tempId = '__unsaved__' + Date.now();
    return {
      ...state,
      [buildingId]: {
        ...state[buildingId],
        answers:{
          ...state[buildingId]['answers'],
          [answer.id]: {
            ...state[buildingId]['answers'][answer.id],
            error: errorMessage,
            fetching: false
          }
        }
      }
    }
  }

  return {
    ...state,
    [buildingId]: {
      ...state[buildingId],
      answers: {
        ...state[buildingId]['answers'],
        [answer.id]: {
          ...state[buildingId]['answers'][answer.id],
          fetching: true,
        }
      }
    }
  }
}

export default function buildings(state = {}, action) {
  if (!action) return state;
  switch (action.type) {
    // Buildings
    case ADD_BUILDING: return addBuilding(state, action);
    case EDIT_BUILDING: return editBuilding(state, action);
    case REMOVE_BUILDING: return removeBuilding(state, action);
    case CREATE_BUILDING: return saveBuilding(state, action);
    case UPDATE_BUILDING: return saveBuilding(state, action);

    // Answers
    case CREATE_ANSWER: return createAnswer(state, action);
    case UPDATE_ANSWER: return updateAnswer(state, action);
  default:
    return state;
  }
}
