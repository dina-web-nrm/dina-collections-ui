/* eslint-disable sort-keys */
const base = require('./base.json')
const info = require('./info.json')
const tags = require('./tags.json')
const paths = require('./paths/index.json')
const definitions = require('./definitions/index.json')
const parameters = require('./parameters/index.json')
const properties = require('./properties/index.json')
const securityDefinitions = require('./securityDefinitions.json')

const schemes = ['http']

module.exports = function buildSpecification() {
  base.info = info
  base.tags = tags
  base.paths = paths
  base.definitions = Object.assign(definitions, properties)
  base.parameters = parameters
  base.schemes = schemes
  base.securityDefinitions = securityDefinitions
  return base
}
