import {
  ADD_BUILDING_TYPE,
} from '../constants';

export function addBuildingType(buildingTypeName, buildingTypeId) {
  return {
    type: ADD_BUILDING_TYPE,
    buildingTypeName,
    buildingTypeId
  };
}
