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


export function wrapReducer(reducer = rootReducer) {
  return function wrappedReducer(state, action) {
    if (action.type === LOAD_INITIAL_STATE) {
      return {...state,  ...action};
    }
    return reducer(state, action);
  }
}

export default rootReducer;
