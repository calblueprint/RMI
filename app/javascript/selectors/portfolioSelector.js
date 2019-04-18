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
        return portfolios[key].selected_building
      }
    }
    return 0
}

export function getSelectedCategoryId(portfolioId, state) {
  let portfolios = state.portfolios; 
  for (let key in portfolios) {
    if (portfolios[key].id == portfolioId) {
      return portfolios[key].selected_category
    }
  }
  return 0
}
