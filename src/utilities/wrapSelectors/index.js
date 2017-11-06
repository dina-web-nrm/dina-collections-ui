export default function wrapSelectors(selectors) {
  const { getLocalState, ...selectorsToWrap } = selectors

  if (!getLocalState) {
    throw new Error('getLocalState selector is required')
  }

  return Object.keys(selectorsToWrap).reduce((result, selectorName) => {
    return {
      ...result,
      [selectorName]: (state, ...args) =>
        selectors[selectorName](getLocalState(state), ...args),
    }
  }, {})
}
