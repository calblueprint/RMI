import {
  ADD_FINISHED_BUILDING,
} from '../constants';

function addFinishedBuilding(state, action) {
  const building = action.building;
  const buildingId = building.id;
  return {
    ...state,
    [buildingId] : building
  }
}

export default function finishedBuildings(state = {}, action) {
  if (!action) return state;
  switch (action.type) {
    // Buildings
    case ADD_FINISHED_BUILDING: return addFinishedBuilding(state, action);
    default: return {};
  }
}