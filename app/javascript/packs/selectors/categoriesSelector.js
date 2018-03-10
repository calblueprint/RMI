//takes in an entity to check that we are in a specific building and returns the categories associated with a specific building
export function getCategories(entity, buildingId, state) {
    // need to make sure we are under a building or categories don't make sense
    if (entity == 'buildings'){
        //we only want the categories associated with a specific building
        return Object.keys(state.categories).filter(id => {
            return state.categories[id].building_type_id == state.buildings[buildingId].building_type_id
        }).map(id => {
            return state.categories[id]
        })
    }
    return {}

}
//returns the category that we are viewing currently
export function getCurrentCategory(cId, state) {
    if (cId) {
        return state.categories[cId];
    }
}
