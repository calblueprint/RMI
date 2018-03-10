export const LOAD_INITIAL_STATE = 'LOAD_INITIAL_STATE';

// Answer ActionTypes
export const ANSWER_FETCH_IN_PROGRESS = 'ANSWER_FETCH_IN_PROGRESS';
export const ANSWER_FETCH_SUCCESS = 'ANSWER_FETCH_SUCCESS';
export const ANSWER_FETCH_FAILURE = 'ANSWER_FETCH_FAILURE';
export const REMOVE_ANSWER = 'REMOVE_ANSWER';

// BuildingType ActionTypes
export const ADD_BUILDING_TYPE = 'ADD_BUILDING_TYPE';
export const CHANGE_BUILDING_TYPE_NAME = 'CHANGE_BUILDING_TYPE_NAME';
export const REMOVE_BUILDING_TYPE = 'REMOVE_BUILDING_TYPE';
export const SAVE_BUILDING_TYPE = 'SAVE_BUILDING_TYPE';

// Portfolio ActionTypes
export const FETCH_PORTFOLIOS = 'FETCH_PORTFOLIOS';

// Building ActionTypes
export const ADD_BUILDING = 'ADD_BUILDING';
export const EDIT_BUILDING = 'EDIT_BUILDING';
export const REMOVE_BUILDING = 'REMOVE_BUILDING';

export const FETCH_BUILDINGS = 'FETCH_BUILDINGS';
export const CREATE_BUILDING = 'CREATE_BUILDING';
export const UPDATE_BUILDING = 'UPDATE_BUILDING';
export const DELETE_BUILDING = 'DELETE_BUILDING';

export const ASSIGN_BUILDING_OPERATOR = 'ASSIGN_BUILDING_OPERATOR';
export const UNASSIGN_BUILDING_OPERATOR = 'UNASSIGN_BUILDING_OPERATOR';

// Question ActionTypes
export const ADD_QUESTION = 'ADD_QUESTION';
export const ADD_OPTION = 'ADD_OPTION';
export const ADD_CATEGORY = 'ADD_CATEGORY';

export const EDIT_QUESTION = 'EDIT_QUESTION';
export const EDIT_OPTION = 'EDIT_OPTION';
export const EDIT_CATEGORY = 'EDIT_CATEGORY';

export const REMOVE_QUESTION = 'REMOVE_QUESTION';
export const REMOVE_OPTION = 'REMOVE_OPTION';
export const REMOVE_CATEGORY = 'REMOVE_CATEGORY';

export const CREATE_QUESTION = 'CREATE_QUESTION';
export const CREATE_OPTION = 'CREATE_OPTION';
export const CREATE_CATEGORY = 'CREATE_CATEGORY';

export const UPDATE_QUESTION = 'UPDATE_QUESTION';
export const UPDATE_OPTION = 'UPDATE_OPTION';
export const UPDATE_CATEGORY = 'UPDATE_CATEGORY';

export const DELETE_QUESTION = 'DELETE_QUESTION';
export const DELETE_OPTION = 'DELETE_OPTION';
export const DELETE_CATEGORY = 'DELETE_CATEGORY';

// Fetch constants
export const FETCH_SUCCESS = 'FETCH_OK';
export const FETCH_FAILURE = 'FETCH_ERR';
export const FETCH_IN_PROGRESS = 'FETCH_LOADING';
export const FETCH_SETTINGS = {
  credentials: 'same-origin',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
};

// Contact constants
export const ADD_CONTACT = 'ADD_CONTACT';
export const EDIT_CONTACT = 'EDIT_CONTACT';
