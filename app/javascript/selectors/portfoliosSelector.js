export function getPortfolioName(portfolioId, state) { 
  return state.portfolios[portfolioId].name
};

export function getSelectedBuildingId(portfolioId, state) {
    return state.portfolios[portfolioId].selected_building
}

export function getSelectedCategoryId(portfolioId, state) {
  return state.portfolios[portfolioId].selected_category
}

export function getAssetManagerEmails(portfolioId, state) {
  return state.portfolios[portfolioId].asset_manager_emails
}
