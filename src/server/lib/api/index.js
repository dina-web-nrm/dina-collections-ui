/* eslint-disable global-require, import/no-dynamic-require */
const express = require('express')
const createLog = require('../../utilities/log')
const createRoutes = require('./routeFactory')

const log = createLog('api')

module.exports = function createApi({
  config,
  controllers,
  keycloak,
  openApiSpec,
  routeHandlerFiles = [],
  routeMockFiles = [],
}) {
  const routeHandlers = routeHandlerFiles.reduce((obj, name) => {
    return {
      ...obj,
      [name]: require(`../../routeHandlers/${name}`),
    }
  }, {})

  const routeMocks = routeMockFiles.reduce((obj, name) => {
    return {
      ...obj,
      [name]: require(`../../routeMocks/${name}`),
    }
  }, {})

  const apiConfig = { controllers, ...config.api }

  const routes = createRoutes({
    apiConfig,
    apiSpecification: openApiSpec,
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
