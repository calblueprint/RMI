export function getCategories(entity, bId, state) {
    // need to make sure we are under a building or categories don't make sense
    if (entity == 'buildings'){
        //we only want the categories associated with a specific building
        return Object.keys(state.categories).filter(id => {
            return state.categories[id].building_type_id == state.buildings[bId].building_type_id
        }).map(id => {
            return state.categories[id]
        })
    }
    return {}

}

export function getCurrentCategory(cId, state) {
    if (cId) {
        return state.categories[cId];
    }
}
