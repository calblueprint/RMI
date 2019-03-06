import {
  ADD_BUILDING_TYPE,
} from '../constants';

export function addBuildingType(buildingTypeName, buildingTypeId, questions, categories) {
  return {
    type: ADD_BUILDING_TYPE,
    buildingTypeName,
    buildingTypeId, 
    questions,
    categories
  };
}
