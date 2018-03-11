import {
    ADD_CONTACT,
    EDIT_CONTACT
} from '../constants';

function attachContact(state, action) {
  const email = action.email;
  return {
    ...state,
    [email]: {
      firstName: action.firstName,
      lastName: action.lastName
    }
  }
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
