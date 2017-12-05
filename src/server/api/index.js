const express = require('express')
const createLog = require('../utilities/log')
const createRoutes = require('./routeFactory')
const routeHandlers = require('./routeHandlers')
const routeMocks = require('./routeMocks')
const openApiSpec = require('dina-schema/build/openApi.json')

const log = createLog('api')

module.exports = function createApi({ config, controllers, keycloak }) {
  const apiConfig = { controllers }

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
