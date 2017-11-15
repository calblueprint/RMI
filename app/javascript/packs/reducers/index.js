import { combineReducers } from 'redux';
import { persistCombineReducers } from 'redux-persist';
import storage from 'redux-persist/es/storage';
import { LOAD_INITIAL_STATE } from '../constants';

import questions from './questions';
import buildings from './buildings';
import portfolios from './portfolios';

const rootReducer = {
  questions,
  buildings,
  portfolios
};

export function wrapReducer(reducer = rootReducer) {
  return function wrappedReducer(state, action) {
    if (action.type === LOAD_INITIAL_STATE) {
      return {...state,  ...action};
    }
    return persistCombineReducers({
      key: 'root',
      storage 
    }, reducer)(state, action);
  }
}

export default rootReducer;
