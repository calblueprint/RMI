export function getBuildingsByPortfolio(portfolioId, state) {
  return Object.keys(state.buildings).filter((buildingId) => {
    return state.buildings[buildingId].portfolio_id == portfolioId;
  }).map((buildingId) => {
    return state.buildings[buildingId];
  });
};

export function getBuildings(state) {
    return state.buildings
};

export function getBuildingById(buildingId, state) {
  return state.buildings[buildingId]

}
//gets buildings by id but checks that we are in a building view
export function getNavBarBuildings(entity, buildingId, state) {
  if (entity == "buildings") {
    if (id) {
        return state.buildings[buildingId]
    }
  }
  return null
}
