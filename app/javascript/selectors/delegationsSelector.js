export function getActiveDelegationForAnswer(answerId, state) {
  return state.delegations[answerId] || null;
}
