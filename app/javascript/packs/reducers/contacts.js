import {
    ADD_CONTACT,
    EDIT_CONTACT
} from '../constants';

function attachContact(state, action) {
  var found = false;
  for (var i = 0; i < state.length; i++) {
    if (state[i].email == action.email) {
      state[i] = {
        email: action.email,
        firstName: action.firstName,
        lastName: action.lastName
      };
      found = true;
      break;
    }
  }
  if (!found) {
    state.push({
      email: action.email,
      firstName: action.firstName,
      lastName: action.lastName
    });
  }
  return state;
}

export default function contacts(state = {}, action) {
  if (!action) return state;
  switch (action.type) {
    case ADD_CONTACT:
    case EDIT_CONTACT:
      return attachContact(state, action);
    default:
      return state;
  }
}
