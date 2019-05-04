import {
  FETCH_PORTFOLIOS,
  FETCH_SUCCESS,
  FETCH_FAILURE,
  ADD_PORTFOLIO,
  SET_ACTIVE_BUILDING,
  SET_ACTIVE_CATEGORY,
  ADD_ASSET_MANAGER
} from "../constants";

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
  };
}

function addPortfolio(state, action) {
  const portfolio = action.portfolio;
  const portfolioId = portfolio.id;
  return {
    ...state,
    [portfolioId]: portfolio
  };
}

function setActiveBuilding(state, action) {
  const pId = action.portfolioId;
  const viewedBuildingId = action.buildingId;
  return {
    ...state,
    [pId]: {
      ...state[pId],
      selected_building: viewedBuildingId,
      selected_category: null
    }
  };
}

function setActiveCategory(state, action) {
  const pId = action.portfolioId;
  const viewedCategoryId = action.categoryId;
  return {
    ...state,
    [pId]: {
      ...state[pId],
      selected_category: viewedCategoryId
    }
  };
}

function addAssetManager(state, action) {
  const pId = action.portfolioId;
  const email = action.email
  return {
    ...state,
    [pId]: {
      ...state,
      asset_manager_emails: [...state.asset_manager_emails, action.email]
    }
  };
}

export default function portfolios(state = {}, action) {
  if (!action) return state;
  switch (action.type) {
    case FETCH_PORTFOLIOS:
      return fetchPortfolios(state, action);
    case ADD_PORTFOLIO:
      return addPortfolio(state, action);
    case SET_ACTIVE_BUILDING:
      return setActiveBuilding(state, action);
    case SET_ACTIVE_CATEGORY:
      return setActiveCategory(state, action);
    default:
      return state;
  }
}
