import buildings from '../buildings';
import finishedBuildings from '../finishedBuildings';
import contacts from '../contacts';

export default {
  buildings,
  contacts,
  questions: (state={}, action) => state,
  categories: (state={}, action) => state,
  user: (state={}, action) => state,
	finishedBuildings
};
