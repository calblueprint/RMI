import {
  FETCH_PORTFOLIOS,
  FETCH_SUCCESS,
  FETCH_FAILURE
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

export default function portfolios(state = {}, action) {
  if (!action) return state;
  switch (action.type) {
    case FETCH_PORTFOLIOS: return fetchPortfolios(state, action);
  default:
    return state;
  }
}
