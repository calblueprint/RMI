import {
  FETCH_PORTFOLIOS,
  FETCH_SUCCESS,
  FETCH_FAILURE, 
  VIEW_BUILDING_DETAILS,
  VIEW_CATEGORY_DETAILS
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

function viewBuildingDetails(state, action) {
  const pId = action.portfolioId;
  const viewedBuildingId = action.buildingId;
  return {
    ...state,
    [pId] : {
      ...state[pId],
      selected_building: viewedBuildingId,
      selected_category: null,
    }
  };
}

function viewCategoryDetails(state, action) {
  const pId = action.portfolioId;
  const viewedCategoryId = action.categoryId;
  return {
    ...state,
    [pId] : {
      ...state[pId],
      selected_category: viewedCategoryId
    }
  };
}


export default function portfolios(state = {}, action) {
  if (!action) return state;
  switch (action.type) {
    case FETCH_PORTFOLIOS: return fetchPortfolios(state, action);
    case VIEW_BUILDING_DETAILS: return viewBuildingDetails(state, action);
    case VIEW_CATEGORY_DETAILS: return viewCategoryDetails(state, action);
    default: return state;
  }
}


