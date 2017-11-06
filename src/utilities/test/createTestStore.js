import createStore from 'store'
import allModules from './allModules'
import createDefaultTestConfig from './defaultTestConfig'

export default function createTestStore(
  {
    bootstrap = false,
    config = createDefaultTestConfig(),
    initialState,
    modules = allModules,
    viewOrder = [],
  } = {}
) {
  return createStore({
    bootstrap,
    config,
    initialState,
    modules,
    viewOrder,
  })
}
