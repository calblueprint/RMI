import { persistReducer } from "redux-persist";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
import storage from "redux-persist/es/storage";
import {
  ADD_BUILDING,
  EDIT_BUILDING,
  CREATE_BUILDING,
  UPDATE_BUILDING,
  REMOVE_BUILDING,
  DELEGATION_FETCH_IN_PROGRESS,
  DELEGATION_FETCH_SUCCESS,
  DELEGATION_FETCH_FAILURE,
  FETCH_SUCCESS,
  FETCH_FAILURE
} from "../constants";
import { answers } from "./answers";

/////////////////////////////////////////////////////////////////
// BUILDINGS ////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////

function addBuilding(state, action) {
  const building = action.building;
  const buildingId = building.id;
  return {
    ...state,
    [buildingId]: building
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
      return newState;
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

function beforeFetchDelegation(state, action) {
  const { buildingId } = action;
  return {
    ...state,
    [buildingId]: {
      ...state[buildingId],
      fetchingDelegations: true
    }
  };
}

function afterFetchDelegation(state, action) {
  const { buildingId, error } = action;

  return {
    ...state,
    [buildingId]: {
      ...state[buildingId],
      fetchingDelegations: false,
      error
    }
  };
}

const persistedAnswerReducers = {};
function getOrCreatePersistedAnswerReducer(buildingId) {
  let persistedReducer = persistedAnswerReducers[buildingId];
  if (persistedReducer) {
    return persistedReducer;
  }
  persistedReducer = persistReducer(
    {
      key: `answers:${buildingId}`,
      storage,
      stateReconciler: autoMergeLevel2
    },
    answers
  );
  persistedAnswerReducers[buildingId] = persistedReducer;
  return persistedReducer;
}

function tryAnswersReducer(state, action) {
  // Pass answer actions on to the answers reducer.
  // (action must have a buildingId to indicate which building the answers belong to)
  if (action.buildingId) {
    return {
      ...state,
      [action.buildingId]: {
        ...state[action.buildingId],
        answers: getOrCreatePersistedAnswerReducer(action.buildingId)(
          state[action.buildingId].answers,
          action
        )
      }
    };
  }
  return state;
}

export default function buildings(state = {}, action) {
  if (!action) return state;
  switch (action.type) {
    // Buildings
    case ADD_BUILDING:
      return addBuilding(state, action);
    case EDIT_BUILDING:
      return editBuilding(state, action);
    case REMOVE_BUILDING:
      return removeBuilding(state, action);
    case CREATE_BUILDING:
      return saveBuilding(state, action);
    case UPDATE_BUILDING:
      return saveBuilding(state, action);
    case DELEGATION_FETCH_IN_PROGRESS:
      return beforeFetchDelegation(state, action);
    case DELEGATION_FETCH_SUCCESS:
      return afterFetchDelegation(state, action);
    case DELEGATION_FETCH_FAILURE:
      return afterFetchDelegation(state, action);
    default:
      return tryAnswersReducer(state, action);
  }
}
