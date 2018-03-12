//takes in an entity to check that we are in a specific building and returns the categories associated with a specific building
export function getCategories(buildingId, state) {
  //we only want the categories associated with a specific building
  return Object.keys(state.categories).filter(id => {
    return state.categories[id].building_type_id == state.buildings[buildingId].building_type_id
  }).map(id => {
    return state.categories[id]
  })
}

//returns the category that we are viewing currently
export function getCurrentCategory(cId, state) {
    return state.categories[cId];
}
