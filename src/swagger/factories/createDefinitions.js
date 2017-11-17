const path = require('path')
const fs = require('fs')

module.exports = function createDefinitions(
  referenceRoot = '#/definitions/',
  attachIds
) {
  const definitionsPath = path.join(
    __dirname,
    '../',
    'specification',
    'definitions'
  )
  const files = fs.readdirSync(definitionsPath)
  const result = files.reduce((definitions, fileName) => {
    if (fileName === 'index.json') {
      return definitions
    }

    const definition = require(path.join(definitionsPath, fileName))
    const name = fileName.replace('.json', '')
    if (attachIds) {
      definition.id = name
    }
    definitions[name] = definition
    return definitions
  }, {})

  return JSON.parse(JSON.stringify(result).replace(/__ROOT__/g, referenceRoot))
}
