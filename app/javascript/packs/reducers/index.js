import { combineReducers } from 'redux';
import { LOAD_INITIAL_STATE } from '../constants';

import questions from './questions';
import buildings from './buildings';
import portfolios from './portfolios';

const rootReducer = combineReducers({
  questions,
  buildings,
  portfolios
});

function wrappedReducer(state, action) {
  if (action.type === LOAD_INITIAL_STATE) {
    return {...state,  ...action};
  }
  return rootReducer(state, action);
}

export default wrappedReducer;
