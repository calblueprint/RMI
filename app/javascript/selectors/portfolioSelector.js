export function getPortfolioName(portfolioId, state) {
    let portfolios = state.portfolios; 
    for (let key in portfolios) {
      if (portfolios[key].id == portfolioId) {
        return portfolios[key].name
      }
    }
};

export function getSelectedBuildingId(portfolioId, state) {
    let portfolios = state.portfolios; 
    for (let key in portfolios) {
      if (portfolios[key].id == portfolioId) {
        return portfolios[key].selectedBuilding
      }
    }
    return 0
}