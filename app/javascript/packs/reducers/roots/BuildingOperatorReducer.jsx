import buildings from '../buildings';
import viewContext from '../viewContext';

export default {
  buildings,
  viewContext,
  // Temporary workaround - we need to move loadInitialState code into separate reducers
  // so that redux-persist doesn't just discard the below keys
  building_types: (state={}, action) => state,
  questions: (state={}, action) => state,
  type: (state={}, action) => state
};
