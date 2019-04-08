import {
  FETCH_PORTFOLIOS,
  FETCH_SUCCESS,
  FETCH_FAILURE,
  FETCH_IN_PROGRESS,
  FETCH_SETTINGS, 
  VIEW_BUILDING_DETAILS,
  VIEW_CATEGORY_DETAILS
} from '../constants';

export async function fetchPortfolios(dispatch) {
  dispatch({
    type: FETCH_PORTFOLIOS,
    status: FETCH_IN_PROGRESS
  });

  try {
    let response = await fetch('/api/portfolios', FETCH_SETTINGS)
      .then(resp => resp.json());
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
  };
};

export function viewBuildingDetails(portfolioId, buildingId) {
  return {
    type: VIEW_BUILDING_DETAILS,
    portfolioId,
    buildingId
  };
}

export function viewCategoryDetails(categoryId, portfolioId) {
  return {
    type: VIEW_CATEGORY_DETAILS,
    portfolioId,
    categoryId
  };
}



