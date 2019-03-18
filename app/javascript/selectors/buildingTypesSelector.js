export function getBuildingType(id, state) {
	return state.building_types[id];
}
export function getBuildingTypes(state) {
	return state.building_types;
}

export function getBuildingTypeNameById(id, state) {
  return state.building_types[id].name;
}