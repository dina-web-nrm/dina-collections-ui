const createBuildEndpointSpec = require('./createBuildEndpointSpec')
const faker = require('json-schema-faker')

const importFaker = () => Promise.resolve(faker)

module.exports = createBuildEndpointSpec({ importFaker })
