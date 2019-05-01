import buildings from "../buildings";
import portfolios from "../portfolios";
import questions from "../questions";
import building_types from "../building_types";
import categories from "../categories";
import contacts from "../contacts";
import delegations from "../delegations";

export default {
  buildings,
  portfolios,
  questions,
  building_types,
  contacts,
  categories,
  user: (state = {}, action) => state,
  userType: (state = {}, action) => state,
  delegations
};
