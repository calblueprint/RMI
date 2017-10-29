import { combineReducers } from 'redux';
import questions from './questions';
import buildings from './buildings';
import portfolios from './portfolios';

const rootReducer = combineReducers({
  questions,
  buildings,
  portfolios
});

export default rootReducer;
