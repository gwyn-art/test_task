export const fillAction = actionName => ({
  [actionName]: actionName,
  [`${actionName}_FULFILLED`]: `${actionName}_FULFILLED`,
  [`${actionName}_REJECTED`]: `${actionName}_REJECTED`
})