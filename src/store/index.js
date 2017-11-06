import { createStore as reduxCreateStore, compose } from 'redux'
import hotswapStoreEnhancer from 'modules/bootstrap/enhancer'
import { bootstrapApplication } from 'modules/bootstrap/actionCreators'
import createLog from 'utilities/log'
import { devToolsExtension } from '../modules/external'
import { moduleOrder } from '../modules'

const log = createLog('store')

export default function createStoreMain({
  bootstrap = true,
  config,
  initialState = {},
  modules,
  viewOrder,
}) {
  log.info('Start createStoreMain')
  log.info('Creating enhancers')
  const enhancers = [
    hotswapStoreEnhancer({
      config,
      moduleOrder,
      viewOrder,
    }),
    devToolsExtension.enhancer && devToolsExtension.enhancer(), // dont do this in production
  ].filter(enhancer => !!enhancer)
  const composedEnhancers = compose(...enhancers)
  const emptyReducer = state => state

  log.info('Creating store')
  const store = reduxCreateStore(emptyReducer, initialState, composedEnhancers)

  log.info('Register modules start')
  store.registerModules(modules)
  log.info('Register modules done')
  if (bootstrap) {
    store.dispatch(bootstrapApplication(config))
  }

  return store
}
