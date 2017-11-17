const createPaths = require('./createPaths')
const createDefinitions = require('./createDefinitions')

/* eslint-disable sort-keys */
const base = require('../specification/base.json')
const info = require('../specification/info.json')
const tags = require('../specification/tags.json')
const securityDefinitions = require('../specification/securityDefinitions.json')

const paths = createPaths()
const definitions = createDefinitions('#/definitions/')

const schemes = ['http']

module.exports = function createSwaggerSpecification() {
  base.info = info
  base.tags = tags
  base.paths = paths
  base.definitions = definitions
  base.schemes = schemes
  base.securityDefinitions = securityDefinitions
  return base
}
