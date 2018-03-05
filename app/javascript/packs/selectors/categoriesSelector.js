export function getCategories(state) {
    return state.categories;
}

export function getCurrentCategory(cId, state) {
    if (cId) {
        return state.categories[cId];
    }
}
