export function getBuildingsByPortfolio(portfolioId, state) {
  return Object.keys(state.buildings).filter((buildingId) => {
    return state.buildings[buildingId].portfolio_id == portfolioId;
  }).reduce((obj, buildingId) => {
    obj[buildingId] = state.buildings[buildingId];
    return obj;
  }, {});
};

