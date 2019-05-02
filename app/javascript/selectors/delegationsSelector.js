export function getActiveDelegationForAnswer(answerId, state) {
  return state.delegations[answerId] || null;
}

// Filter an array of delegation objects by building_operator.email,
// i.e. for multiple delegations to the same person, only keep the first.
export function filterUniquePersonDelegations(delegations) {
  return delegations.reduce((uniqueDelegations, delegation) => {
    for (const d of uniqueDelegations) {
      if (delegation.building_operator.email === d.building_operator.email) {
        return uniqueDelegations;
      }
    }
    return [...uniqueDelegations, delegation];
  }, []);
}
