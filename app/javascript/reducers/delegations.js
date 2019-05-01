import { DELEGATION_FETCH_SUCCESS } from "../constants";
import { toObjectByKey } from "../actions/initialState";

export default function delegations(state = {}, action) {
  if (!action) return state;
  switch (action.type) {
    case DELEGATION_FETCH_SUCCESS:
      return { ...state, ...toObjectByKey(action.delegations, "answer_id") };
    default:
      return state;
  }
}
