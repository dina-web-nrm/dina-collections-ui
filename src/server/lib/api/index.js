const path = require('path')
/* eslint-disable global-require, import/no-dynamic-require */
const express = require('express')
const createLog = require('../../utilities/log')
const createRoutes = require('./routeFactory')

const log = createLog('api')

module.exports = function createApi({
  basePath = '../../postgresExample',
  config,
  controllers,
  keycloak,
  openApiSpec,
  routeHandlerFiles = [],
  routeMockFiles = [],
}) {
  const routeHandlers = routeHandlerFiles.reduce((obj, name) => {
    const routePath = path.join(basePath, 'routeHandlers', name)
    return {
      ...obj,
      [name]: require(routePath),
    }
  }, {})

  const routeMocks = routeMockFiles.reduce((obj, name) => {
    const routeMockPath = path.join(basePath, 'routeMocks', name)
    return {
      ...obj,
      [name]: require(routeMockPath),
    }
  }, {})

  const apiConfig = { controllers, ...config.api, log: config.log }

  const routes = createRoutes({
    apiConfig,
    apiSpecification: openApiSpec,
    config,
    controllers,
    routeHandlers,
    routeMocks,
  })

  const api = express.Router() //eslint-disable-line

  if (config.auth.active) {
    api.use(keycloak.protect())
  }

  routes.forEach(({ middlewares, pathname, verbName }) => {
    log.info(`Register route: ${verbName.toUpperCase()} - ${pathname}`)
    api[verbName](pathname, middlewares)
  })

  return api
}
