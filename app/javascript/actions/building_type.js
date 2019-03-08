import {
  ADD_BUILDING_TYPE,
} from '../constants';

export function addBuildingType(newBuildingType) {
  return {
    type: ADD_BUILDING_TYPE,
    newBuildingType
  };
}
