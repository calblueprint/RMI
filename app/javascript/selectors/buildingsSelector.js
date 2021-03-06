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

export function getStreetAddressByBuildingId(id, state) {
  let building = state.buildings[id]
  return building.address;
}

export function getCityStateAddressByBuildingId(id, state) {
  let building = state.buildings[id]
  return building.city + ", " + building.state + " " + String(building.zip);
}

export function getNameByBuildingId(id, state) {
  return state.buildings[id].name;
}
