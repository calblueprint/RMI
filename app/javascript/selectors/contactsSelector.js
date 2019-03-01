export function getContacts(state) {
  if (state.contacts) {
    return Object.values(state.contacts);
  } else {
    // for compatibility with no contact code
    return [];
  }
};
