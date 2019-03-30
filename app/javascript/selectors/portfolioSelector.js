export function getPortfolioName(portfolioId, state) {
    let portfolios = state.portfolios; 
    for (let key in portfolios) {
      if (portfolios[key].id == portfolioId) {
        return portfolios[key].name
      }
    }
  };