const createBuildEndpointSpec = require('./createBuildEndpointSpec')

const importFaker = () => import('json-schema-faker')

module.exports = createBuildEndpointSpec({ importFaker })
