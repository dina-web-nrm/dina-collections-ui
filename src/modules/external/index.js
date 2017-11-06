import { routerMiddleware, routerReducer } from 'react-router-redux'
import { createLogger } from 'redux-logger'
import { middleware as localStorageMiddleware } from 'redux-module-local-storage'

const getDevToolsExtensionEnhancer = () => {
  if (process.env.NODE_ENV === 'development') {
    const devToolsExtension = window.devToolsExtension

    if (typeof devToolsExtension === 'function') {
      return devToolsExtension
    }
  }
  return null
}

const getLoggerMiddleware = () => {
  if (process.env.NODE_ENV === 'development') {
    return createLogger
  }
  return null
}

export const routing = {
  middleware: routerMiddleware,
  name: 'routing',
  reducer: routerReducer,
}

export const logger = {
  middleware: getLoggerMiddleware(),
  name: 'logger',
}

export const localStorage = {
  middleware: localStorageMiddleware,
  name: 'localStorage',
}

export const devToolsExtension = {
  enhancer: getDevToolsExtensionEnhancer(),
  name: 'devToolsExtension',
}
