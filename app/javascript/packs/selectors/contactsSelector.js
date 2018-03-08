export function getContacts(state) {
  if (state.contacts) {
    return state.contacts;
  } else {
    // for compatibility with no contact code
    return [];
  }
};
