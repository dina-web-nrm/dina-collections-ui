import createMiddlewareArray from './createMiddlewareArray'
import createMiddlewareMap from './createMiddlewareMap'
import createRootReducer from './createRootReducer'
import createModuleMap from './createModuleMap'
import createListeners from './createListeners'

export default function updateModuleState({
  availableModules,
  availableViews = {},
  config,
  listenerMap = {},
  middlewareApi,
  middlewareMap = {},
  moduleMap = {},
  moduleOrder = [],
  newModules = [],
  removeModules = [],
  viewOrder = [],
}) {
  const newModuleMap = createModuleMap({
    availableModules,
    availableViews,
    config,
    moduleMap,
    newModules,
    removeModules,
  })

  const newMiddlewareMap = createMiddlewareMap({
    config,
    middlewareMap,
    newModules,
    removeModules,
  })

  const newMiddlewareArray = createMiddlewareArray({
    middlewareMap: newMiddlewareMap,
    moduleOrder,
    viewOrder,
  })

  const newReducer = createRootReducer({
    config,
    moduleMap: newModuleMap,
  })

  const newListenerMap = createListeners({
    config,
    listenerMap,
    middlewareApi,
    newModules,
    removeModules,
  })

  return {
    listenerMap: newListenerMap,
    middlewareArray: newMiddlewareArray,
    middlewareMap: newMiddlewareMap,
    moduleMap: newModuleMap,
    reducer: newReducer,
  }
}
