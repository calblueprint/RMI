import {
  FETCH_PORTFOLIOS,
  FETCH_SUCCESS,
  FETCH_FAILURE,
  FETCH_IN_PROGRESS,
  FETCH_SETTINGS,
  ADD_PORTFOLIO,
  SET_ACTIVE_CATEGORY,
  SET_ACTIVE_BUILDING
} from "../constants";

export async function fetchPortfolios(dispatch) {
  dispatch({
    type: FETCH_PORTFOLIOS,
    status: FETCH_IN_PROGRESS
  });

  try {
    let response = await fetch("/api/portfolios", FETCH_SETTINGS).then(resp =>
      resp.json()
    );
    dispatch({
      type: FETCH_PORTFOLIOS,
      status: FETCH_SUCCESS,
      response: response.data
    });
  } catch (err) {
    dispatch({
      type: FETCH_PORTFOLIOS,
      status: FETCH_FAILURE,
      response: err
    });
  }
}

export function addPortfolio(portfolio) {
  return {
    type: ADD_PORTFOLIO,
    portfolio
  };
}

export function setActiveBuilding(portfolioId, buildingId) {
  return {
    type: SET_ACTIVE_BUILDING,
    portfolioId,
    buildingId
  };
}

export function setActiveCategory(categoryId, portfolioId) {
  return {
    type: SET_ACTIVE_CATEGORY,
    portfolioId,
    categoryId
  };
}
