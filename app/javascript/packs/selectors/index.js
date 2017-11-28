export function getBuildingsByPortfolio(portfolioId, state) {
  return Object.keys(state.buildings).filter((buildingId) => {
    return state.buildings[buildingId].portfolio_id == portfolioId;
  }).reduce((obj, buildingId) => {
    obj[buildingId] = state.buildings[buildingId];
    return obj;
  }, {});
};

export function getBuildings(state) {
  return state.buildings
}

export function getQuestionsByBuilding(buildingId, state) {
  const buildingTypeId = state.buildings[buildingId].building_type_id;
  return state.building_types[buildingTypeId].questions.map((questionId) => {
    return state.questions[questionId];
  });
}

