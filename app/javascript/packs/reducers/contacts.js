import {
    ADD_CONTACT,
    DELETE_CONTACT,
} from '../constants';

function attachContact(state, action) {
  state.push({
    email: action.email,
    firstName: action.firstName,
    lastName: action.lastName
  });
  return state;
}

function deleteContact(state, action) {
  return state.filter(contact => contact.email != action.email);
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
