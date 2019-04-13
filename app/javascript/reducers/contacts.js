import { ADD_CONTACT, DELETE_CONTACT } from "../constants";

function attachContact(state, action) {
  return {
    ...state,
    [action.email]: {
      email: action.email,
      first_name: action.first_name,
      last_name: action.last_name
    }
  };
}

function deleteContact(state, action) {
  return Object.keys(state)
    .filter(email => email !== action.email)
    .reduce((newState, email) => {
      newState[email] = state[email];
      return newState;
    }, {});
}

export default function contacts(state = {}, action) {
  if (!action) return state;
  switch (action.type) {
    case ADD_CONTACT:
      return attachContact(state, action);
    case DELETE_CONTACT:
      return deleteContact(state, action);
    default:
      return state;
  }
}
