import objectPath from 'object-path'
import immutable from 'object-path-immutable'

export default function registerModuleProperty({
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
  const modules = action.payload.modules || {}

  const mergedPropertyObject = Object.keys(modules).reduce(
    (obj, moduleName) => {
      const module = modules[moduleName]
      if (!module[property]) {
        return obj
      }

      return {
        ...obj,
        [moduleName]: module[property],
      }
    },
    currentPropertyObject || {}
  )

  if (mergedPropertyObject === currentPropertyObject) {
    return state
  }

  return immutable.set(state, statePath, mergedPropertyObject)
}
