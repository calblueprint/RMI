import buildings from '../buildings';
import portfolios from '../portfolios';
import contacts from '../contacts';

export default {
  contacts,
  buildings,
  portfolios,
  questions: (state={}, action) => state,
  categories: (state={}, action) => state,
  user: (state={}, action) => state
};

