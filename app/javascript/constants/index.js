export const LOAD_INITIAL_STATE = "LOAD_INITIAL_STATE";

// Answer ActionTypes
export const ANSWER_FETCH_IN_PROGRESS = "ANSWER_FETCH_IN_PROGRESS";
export const ANSWER_FETCH_SUCCESS = "ANSWER_FETCH_SUCCESS";
export const ANSWER_FETCH_FAILURE = "ANSWER_FETCH_FAILURE";
export const ADD_ANSWERS = "ADD_ANSWERS";
export const ADD_DELEGATIONS = "ADD_DELEGATIONS";
export const UPDATE_LOCAL_ANSWER = "UPDATE_LOCAL_ANSWER";
export const DELETE_LOCAL_ANSWER = "DELETE_LOCAL_ANSWER";
export const REMOVE_ANSWER = "REMOVE_ANSWER";

// BuildingType ActionTypes
export const ADD_BUILDING_TYPE = "ADD_BUILDING_TYPE";
export const CHANGE_BUILDING_TYPE_NAME = "CHANGE_BUILDING_TYPE_NAME";
export const REMOVE_BUILDING_TYPE = "REMOVE_BUILDING_TYPE";
export const SAVE_BUILDING_TYPE = "SAVE_BUILDING_TYPE";

// Portfolio ActionTypes
export const FETCH_PORTFOLIOS = "FETCH_PORTFOLIOS";
export const ADD_PORTFOLIO = "ADD_PORTFOLIO";
export const SET_ACTIVE_BUILDING = "SET_ACTIVE_BUILDING";
export const SET_ACTIVE_CATEGORY = "SET_ACTIVE_CATEGORY";
export const ADD_ASSET_MANAGER = "ADD_ASSET_MANAGER";

// Building ActionTypes
export const ADD_BUILDING = "ADD_BUILDING";
export const EDIT_BUILDING = "EDIT_BUILDING";
export const REMOVE_BUILDING = "REMOVE_BUILDING";

export const FETCH_BUILDINGS = "FETCH_BUILDINGS";
export const CREATE_BUILDING = "CREATE_BUILDING";
export const UPDATE_BUILDING = "UPDATE_BUILDING";
export const DELETE_BUILDING = "DELETE_BUILDING";

export const ASSIGN_BUILDING_OPERATOR = "ASSIGN_BUILDING_OPERATOR";
export const UNASSIGN_BUILDING_OPERATOR = "UNASSIGN_BUILDING_OPERATOR";

// Question ActionTypes
export const QUESTION_FETCH_IN_PROGRESS = "QUESTION_FETCH_IN_PROGRESS";
export const UPDATE_LOCAL_QUESTION = "UPDATE_LOCAL_QUESTION";
export const QUESTION_FETCH_FAILURE = "QUESTION_FETCH_FAILURE";
export const QUESTION_FETCH_SUCCESS = "QUESTION_FETCH_SUCCESS";
export const QUESTION_SET_NEW = "QUESTION_SET_NEW";

export const CREATE_UNSAVED_QUESTION = "CREATE_UNSAVED_QUESTION";

export const ADD_QUESTION = "ADD_QUESTION";
export const ADD_OPTION = "ADD_OPTION";
export const ADD_CATEGORY = "ADD_CATEGORY";

export const EDIT_QUESTION = "EDIT_QUESTION";
export const EDIT_OPTION = "EDIT_OPTION";
export const EDIT_CATEGORY = "EDIT_CATEGORY";

export const REMOVE_QUESTION = "REMOVE_QUESTION";
export const REMOVE_OPTION = "REMOVE_OPTION";
export const REMOVE_CATEGORY = "REMOVE_CATEGORY";

export const CREATE_QUESTION = "CREATE_QUESTION";
export const CREATE_OPTION = "CREATE_OPTION";
export const CREATE_CATEGORY = "CREATE_CATEGORY";

export const UPDATE_QUESTION = "UPDATE_QUESTION";
export const UPDATE_OPTION = "UPDATE_OPTION";
export const UPDATE_CATEGORY = "UPDATE_CATEGORY";

export const DELETE_QUESTION = "DELETE_QUESTION";
export const DELETE_OPTION = "DELETE_OPTION";
export const DELETE_CATEGORY = "DELETE_CATEGORY";

// Option ActionTypes
export const OPTION_FETCH_IN_PROGRESS = "OPTION_FETCH_IN_PROGRESS";
export const UPDATE_LOCAL_OPTION = "UPDATE_LOCAL_OPTION";
export const CREATE_UNSAVED_OPTION = "CREATE_UNSAVED_OPTION";

export const OPTION_FETCH_SUCCESS = "OPTION_FETCH_SUCCESS";
export const OPTION_FETCH_FAILURE = "OPTION_FETCH_FAILURE";

// Intermediate save constants
export const PRE_FETCH_SAVE = "PRE_FETCH_SAVING";
export const PAUSE_INTERVAL_BEFORE_SAVE = 1500;

// Fetch constants
export const FETCH_SUCCESS = "FETCH_SUCCESS";
export const FETCH_FAILURE = "FETCH_FAILURE";
export const FETCH_IN_PROGRESS = "FETCH_IN_PROGRESS";
export const FETCH_SETTINGS = {
	credentials: "same-origin",
	headers: {
		Accept: "application/json",
		"Content-Type": "application/json"
	}
};

// Contact constants
export const ADD_CONTACT = "ADD_CONTACT";
export const DELETE_CONTACT = "DELETE_CONTACT";

// Category constants
export const UPDATE_LOCAL_CATEGORY = "UPDATE_LOCAL_CATEGORY";
export const CATEGORY_FETCH_IN_PROGRESS = "CATEGORY_FETCH_IN_PROGRESS";
export const CREATE_UNSAVED_CATEGORY = "CREATE_UNSAVED_CATEGORY";
export const CATEGORY_FETCH_FAILURE = "CATEGORY_FETCH_FAILURE";
export const CATEGORY_FETCH_SUCCESS = "CATEGORY_FETCH_SUCCESS";
export const SET_CATEGORY_TO_NEW = "SET_CATEGORY_TO_NEW";
