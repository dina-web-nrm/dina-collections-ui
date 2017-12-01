import objectPath from 'object-path'
import immutable from 'object-path-immutable'

export default function unregisterModuleProperty({
  action,
  property,
  scopeUnderModules = false,
  state,
}) {
  if (!(action && action.payload)) {
    return state
  }

  const statePath = scopeUnderModules ? `${property}.modules` : property
  const currentPropertyObject = objectPath.get(state, statePath)

  if (!(currentPropertyObject && Object.keys(currentPropertyObject).length)) {
    return state
  }

  const modules = action.payload.modules || {}

  const mergedPropertyObject = Object.keys(modules).reduce(
    (obj, moduleName) => {
      if (!obj[moduleName]) {
        return obj
      }
      const newObj = {
        ...obj,
      }

      delete newObj[moduleName] // eslint-disable-line no-param-reassign

      return newObj
    },
    currentPropertyObject
  )

  if (mergedPropertyObject === currentPropertyObject) {
    return state
  }

  return immutable.set(state, statePath, mergedPropertyObject)
}
