import {
  FETCH_IN_PROGRESS,
  CATEGORY_FETCH_IN_PROGRESS,
  UPDATE_LOCAL_CATEGORY,
  PRE_FETCH_SAVE,
  CREATE_UNSAVED_CATEGORY,
  FETCH_FAILURE,
  FETCH_SUCCESS,
  CATEGORY_FETCH_FAILURE,
  CATEGORY_FETCH_SUCCESS,
  REMOVE_CATEGORY,
  DELETE_SUCCESS,
  DELETE_FAILURE,
  DELETE_IN_PROGRESS,
  CATEGORY_DELETE_SUCCESS,
  CATEGORY_DELETE_FAILURE,
  CATEGORY_DELETE_IN_PROGRESS,
  SET_CATEGORY_TO_NEW
} from '../constants';


export function categoryFetchInProgress(category) {
  return {
    type: CATEGORY_FETCH_IN_PROGRESS,
    fetchStatus: FETCH_IN_PROGRESS,
    category
  }
}

export function categoryPreFetchSave(category) {
  return {
    type: UPDATE_LOCAL_CATEGORY,
    fetchStatus: PRE_FETCH_SAVE,
    category
  }
}

export function beforeCreateNewCategory(category) {
  return {
    type: CREATE_UNSAVED_CATEGORY,
    fetchStatus: PRE_FETCH_SAVE,
    category
  }
}

export function categoryFetchSuccess(response) {
  return {
    type: CATEGORY_FETCH_SUCCESS,
    fetchStatus: FETCH_SUCCESS,
    building_type_id: response.building_type_id,
    response
  };
}

export function categoryFetchFailure(error, category) {
  return {
    type: CATEGORY_FETCH_FAILURE,
    fetchStatus: FETCH_FAILURE,
    building_type_id: category.building_type_id,
    error,
    category
  };
}

export function categoryDeleteSuccess(category) {
  return {
    type: CATEGORY_DELETE_SUCCESS,
    deleteStatus: DELETE_SUCCESS,
    building_type_id: category.building_type_id,
    category
  };
}

export function categoryDeleteFailure(error, category) {
  return {
    type: CATEGORY_DELETE_FAILURE,
    deleteStatus: DELETE_FAILURE,
    building_type_id: category.building_type_id,
    error,
    category
  };
}

export function categoryDeleteInProgress(category) {
  return {
    type: CATEGORY_DELETE_IN_PROGRESS,
    deleteStatus: DELETE_IN_PROGRESS,
    category
  }
}

export function removeCategory(category) {
  return {
    type: REMOVE_CATEGORY,
    category
  }
}

export function categorySetNew(categoryId) {
  return {
    type: SET_CATEGORY_TO_NEW,
    categoryId
  }
}
