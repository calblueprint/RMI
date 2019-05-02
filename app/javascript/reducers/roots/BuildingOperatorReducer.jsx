import { combineReducers } from "redux";

import buildings from "../buildings";
import contacts from "../contacts";

export default combineReducers({
  buildings,
  contacts,
  questions: (state = {}, action) => state,
  categories: (state = {}, action) => state,
  user: (state = {}, action) => state,
  userType: (state = {}, action) => state
});
