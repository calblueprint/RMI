import {
  ADD_CONTACT,
  EDIT_CONTACT
} from '../constants';

export function addContact(contactEmail, contactFirstName, contactLastName) {
  return {
    type: ADD_CONTACT,
    email: contactEmail,
    firstName: contactFirstName,
    lastName: contactLastName
  };
}

export function editContact(contactEmail, contactFirstName, contactLastName) {
  return {
    type: EDIT_CONTACT,
    email: contactEmail,
    firstName: contactFirstName,
    lastName: contactLastName
  };
}
