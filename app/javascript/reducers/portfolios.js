import {
  FETCH_PORTFOLIOS,
  FETCH_SUCCESS,
  FETCH_FAILURE,
  ADD_PORTFOLIO
} from '../constants';

function fetchPortfolios(state, action) {
  if (action.status === FETCH_SUCCESS) {
    const normalizedResponse = action.response.reduce((obj, portfolio) => {
      obj[portfolio.id] = portfolio;
      return obj;
    }, {});
    return {
      ...state,
      ...normalizedResponse,
      fetching: false,
      error: false
    };
  }

  if (action.status === FETCH_FAILURE) {
    return {
      ...state,
      fetching: false,
      error: action.response
    };
  }

  return {
    ...state,
    fetching: true
  }
}

function addPortfolio(state, action) {
  console.log('reducer')
  const portfolio = action.portfolio;
  const portfolioId = portfolio.id;
  return {
    ...state,
    [portfolioId]: portfolio
  }
}

export default function portfolios(state = {}, action) {
  if (!action) return state;
  switch (action.type) {
    case FETCH_PORTFOLIOS: return fetchPortfolios(state, action);
    case ADD_PORTFOLIO: return addPortfolio(state, action);
    default: return state;
  }
}
