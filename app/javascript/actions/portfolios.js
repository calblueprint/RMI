import {
  FETCH_PORTFOLIOS,
  FETCH_SUCCESS,
  FETCH_FAILURE,
  FETCH_IN_PROGRESS,
  FETCH_SETTINGS,
  ADD_PORTFOLIO
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

export function addPortfolio(portfolio) {
  type: ADD_PORTFOLIO,
  portfolio
}

