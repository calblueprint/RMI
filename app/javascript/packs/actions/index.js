import * as buildings from './buildings';
import * as portfolios from './portfolios';
import * as questions from './questions';

import { LOAD_INITIAL_STATE } from '../constants';

export default { buildings, portfolios, questions };

export function loadInitialState(initialState) {

  

  return {
    type: LOAD_INITIAL_STATE,

  }
}
