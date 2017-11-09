import { compose } from 'redux'
import createLog from 'utilities/log'
import Dependor from 'utilities/Dependor'

import createSerializedModuleMap from './utilities/createSerializedModuleMap'
import registerModulesActionCreator from './actionCreators/registerModules'
import startListeners from './utilities/startListeners'
import unregisterModulesActionCreator from './actionCreators/unregisterModules'
import updateModuleState from './utilities/updateModuleState'

const log = createLog('modules:bootstrap:enhancer')

export const dep = new Dependor(
  {
    createSerializedModuleMap,
    registerModulesActionCreator,
    startListeners,
    unregisterModulesActionCreator,
    updateModuleState,
  },
  'modules:bootstrap:enhancer'
)

export default function updateStoreEnhancer({ config, moduleOrder = [] }) {
  const availableModules = moduleOrder.reduce((obj, moduleName) => {
    return {
      ...obj,
      [moduleName]: true,
    }
  }, {})

  return createStore => (...params) => {
    log.info('Create store')
    const store = createStore(...params)

    let { dispatch } = store
    let chain = []

    const middlewareApi = {
      dispatch: (...args) => dispatch(...args),
      getState: store.getState,
    }

    const updateDispatch = middlewares => {
      chain = middlewares.map(middleware => middleware(middlewareApi))
      dispatch = compose(...chain)(store.dispatch)
    }

    const dynamicDispatch = (...args) => {
      return dispatch(...args)
    }

    let moduleState = {}

    const registerModules = modules => {
      log.info(
        'Register modules start:',
        modules.map(({ name }) => name).join(', ')
      )
      moduleState = dep.updateModuleState({
        ...moduleState,
        availableModules,
        config,
        middlewareApi,
        moduleOrder,
        newModules: modules,
      })
      log.debug('Module state updated')
      const { middlewareArray, reducer } = moduleState

      updateDispatch(middlewareArray)
      log.debug('Dispatch updated')
      store.replaceReducer(reducer)
      log.debug('Reducer replaced')
      // leave this to translation module instead?
      // might make sense to put in middleware
      // add pre and post / success
      dynamicDispatch(
        dep.registerModulesActionCreator({
          config,
          modules: dep.createSerializedModuleMap(modules),
        })
      )
      dep.startListeners({
        listenerMap: moduleState.listenerMap,
        middlewareApi,
      })
      log.debug('Listeners started')
      log.info('Register modules done')
    }

    const unregisterModules = modules => {
      log.info(
        'Unregister modules start:',
        modules.map(({ name }) => name).join(', ')
      )

      moduleState = dep.updateModuleState({
        ...moduleState,
        availableModules,
        config,
        middlewareApi,
        moduleOrder,
        removeModules: modules,
      })

      const { middlewareArray, reducer } = moduleState

      updateDispatch(middlewareArray)
      store.replaceReducer(reducer)
      dynamicDispatch(
        dep.unregisterModulesActionCreator({
          modules: dep.createSerializedModuleMap(modules),
        })
      )

      log.info('Unregister modules done')
    }

    updateDispatch([])

    return {
      ...store,
      dispatch: dynamicDispatch,
      registerModules,
      unregisterModules,
    }
  }
}
