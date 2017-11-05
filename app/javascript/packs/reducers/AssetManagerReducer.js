import { combineReducers } from 'redux';

import buildings from '../reducers/buildings';
import portfolios from '../reducers/portfolios';

export const rootReducer = combineReducers({
  buildings,
  portfolios
});
