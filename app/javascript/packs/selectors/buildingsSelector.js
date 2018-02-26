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

export function getBuildingByID(buildingId, state) {
  return state.buildings[buildingId]

}

export function getNavBarBuildings(entity, id, state) {
  if (entity == "buildings") {
    if (id) {
        return state.buildings[id]
    }
  }
  return null
}
