import { combineReducers } from "redux";

import { LOAD_INITIAL_STATE } from "../constants";
import questions from "./questions";
import buildings from "./buildings";
import portfolios from "./portfolios";
import contacts from "./contacts";
import building_types from "./building_types";

const rootReducer = combineReducers({
  questions,
  buildings,
  portfolios,
  contacts,
  building_types
});

export default function reducerWithInitialState(reducer = rootReducer) {
  if (!reducer || typeof reducer !== "function") {
    reducer = rootReducer;
  }

  return function wrappedReducer(state, action) {
    if (action.type === LOAD_INITIAL_STATE) {
      const { type, ...initialState } = action;
      return { ...state, ...initialState };
    }
    return reducer(state, action);
  };
}
