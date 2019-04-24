import buildings from "../buildings";
import portfolios from "../portfolios";
import contacts from "../contacts";
import building_types from "../building_types";

export default {
  contacts,
  buildings,
  portfolios,
  building_types,
  questions: (state = {}, action) => state,
  categories: (state = {}, action) => state,
  user: (state = {}, action) => state,
  userType: (state = {}, action) => state
};
