import {
  ADD_BUILDING_TYPE,
} from '../constants';

export function addBuildingType(buildingType) {
  return {
    type: ADD_BUILDING_TYPE,
    buildingType
  };
}
