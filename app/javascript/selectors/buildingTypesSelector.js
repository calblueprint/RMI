export function getBuildingType(id, state) {
  if (state.building_types) {
    return state.building_types[id];
  }
}

export function getBuildingTypeNameById(id, state) {
  if (state.building_types) {
    return state.building_types[id].name;
  }
}