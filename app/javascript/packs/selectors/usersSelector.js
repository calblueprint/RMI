export function getName(state) {
  if (!state.user)
    return "";
  return state.user.first_name + ' ' + state.user.last_name
}

export function getEmail(state) {
  if (!state.user)
    return "";
  return state.user.email
}
