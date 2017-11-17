const createDefinitions = require('./createDefinitions')

/* eslint-disable sort-keys */
const definitions = createDefinitions('', true)

module.exports = function createSwaggerSpecification() {
  return definitions
}
