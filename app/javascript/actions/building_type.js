import {
  ADD_BUILDING_TYPE,
} from '../constants';

export function addBuildingType(buildingTypeName) {
  return {
    type: ADD_BUILDING_TYPE,
    buildingTypeName
  };
}
