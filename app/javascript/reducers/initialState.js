import { combineReducers } from 'redux';
import { persistCombineReducers } from 'redux-persist';
import storage from 'redux-persist/es/storage';
import { LOAD_INITIAL_STATE } from '../constants';

import questions from './questions';
import buildings from './buildings';
import finishedBuildings from './finishedBuildings';
import portfolios from './portfolios';
import contacts from './contacts';

const rootReducer = {
  questions,
  buildings,
  portfolios,
  contacts,
  finishedBuildings
};

export default function reducerWithInitialState(reducer = rootReducer) {
  return function wrappedReducer(state, action) {
    if (action.type === LOAD_INITIAL_STATE) {
      return {...state, ...action};
    }
    return persistCombineReducers({
      key: 'root',
      storage
    }, reducer)(state, action);
  }
}

