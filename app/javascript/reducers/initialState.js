import { persistCombineReducers } from "redux-persist";
import storage from "redux-persist/es/storage";
import { LOAD_INITIAL_STATE } from "../constants";

import questions from "./questions";
import buildings from "./buildings";
import portfolios from "./portfolios";
import contacts from "./contacts";
import building_types from "./building_types";

const rootReducer = {
  questions,
  buildings,
  portfolios,
  contacts,
  building_types
};

export default function reducerWithInitialState(reducer = rootReducer) {
  const persistedReducer = persistCombineReducers(
    {
      key: "root",
      storage
    },
    reducer
  );

  return function wrappedReducer(state, action) {
    if (action.type === LOAD_INITIAL_STATE) {
      return { ...state, ...action };
    }
    return persistedReducer(state, action);
  };
}
