import {
  ADD_BUILDING,
  ADD_FINISHED_BUILDING,
  EDIT_BUILDING,
  REMOVE_BUILDING,
  CREATE_BUILDING,
  UPDATE_BUILDING,
  ASSIGN_BUILDING_OPERATOR,
  UNASSIGN_BUILDING_OPERATOR,
  FETCH_SUCCESS,
  FETCH_FAILURE,
  FETCH_IN_PROGRESS,
  FETCH_SETTINGS
} from '../constants';

export function addBuilding(building) {
  return {
    type: ADD_BUILDING,
    building
  };
}

export function editBuilding(id, updatedBuilding) {
  return {
    type: EDIT_BUILDING,
    building: updatedBuilding,
    buildingId: id
  };
}

export function removeBuilding(buildingId) {
  return {
    type: REMOVE_BUILDING,
    buildingId: buildingId
  };
}

function buildingFetchSuccess(type, id, response) {
  return {
    type,
    status: FETCH_SUCCESS,
    buildingId: id,
    response
  };
}

function buildingFetchFailure(type, id, error) {
  return {
    ...saveError(type, error),
    buildingId: id,
  };
}

export async function createBuilding(id, building, dispatch) {
  dispatch({
    type: CREATE_BUILDING,
    status: FETCH_IN_PROGRESS,
    buildingId: id
  });

  try {
    const buildingData = JSON.stringify({
      ...building,
      portfolio_id: building.portfolioId
    });

    let response = await fetch(`/api/buildings/`, {
      method: 'POST',
      data: buildingData,
      ...FETCH_SETTINGS
    }).then(resp => resp.json());

    dispatch(removeBuilding(id, dispatch));

    let id = response.data.id;
    dispatch(buildingFetchSuccess(CREATE_BUILDING, id, response.data));
  } catch (error) {
    dispatch(buildingFetchFailure(CREATE_BUILDING, id, error));
  };
}

export async function updateBuilding(id, updatedBuilding, dispatch) {  
  dispatch({
    type: UPDATE_BUILDING,
    status: FETCH_IN_PROGRESS,
    buildingId: id
  });

  try {
    const buildingData = JSON.stringify({
      ...updatedBuilding,
      portfolio_id: updatedBuilding.portfolioId
    });

    let response = await fetch(`/api/buildings/${id}`, {
      method: 'PUT',
      data: buildingData,
      ...FETCH_SETTINGS
    }).then(resp => resp.json());

    dispatch(buildingFetchSuccess(UPDATE_BUILDING, id, response.data));
  } catch (error) {
    dispatch(buildingFetchFailure(UPDATE_BUILDING, id, error));
  };
}

