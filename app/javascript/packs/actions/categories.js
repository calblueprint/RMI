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

export function removeCategory(category) {
  return {
    type: REMOVE_CATEGORY,
    category
  }
}

export function categoryRemoveInProgress(category) {
  return {
    type: CATEGORY_REMOVE_IN_PROGRESS,
    fetchStatus: FETCH_IN_PROGRESS,
    category
  }
}

export function categoryRemoveSuccess(response) {
  return {
    type: CATEGORY_REMOVE_SUCCESS,
    fetchStatus: FETCH_SUCCESS,
    building_type_id: response.building_type_id,
    response
  };
}

export function categoryRemoveFailure(error, category) {
  return {
    type: CATEGORY_REMOVE_FAILURE,
    fetchStatus: FETCH_FAILURE,
    building_type_id: category.building_type_id,
    error,
    category
  };
}

export function categorySetNew(categoryId) {
  return {
    type: SET_CATEGORY_TO_NEW,
    categoryId
  }
}

