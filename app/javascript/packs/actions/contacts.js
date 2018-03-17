import {
  ADD_CONTACT,
  DELETE_CONTACT
} from '../constants';

export function addContact(contactEmail, contactFirstName, contactLastName) {
  return {
    type: ADD_CONTACT,
    email: contactEmail,
    firstName: contactFirstName,
    lastName: contactLastName
  };
}

export function deleteContact(contactEmail) {
  return {
    type: DELETE_CONTACT,
    email: contactEmail,
  };
}
