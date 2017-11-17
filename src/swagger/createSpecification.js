const path = require('path')
const fs = require('fs')
const buildSpecification = require('./specification')

function compileDefinitions() {
  const definitionsPath = path.join(__dirname, 'specification', 'definitions')
  const files = fs.readdirSync(definitionsPath)
  const result = files.reduce((definitions, fileName) => {
    if (fileName === 'index.json') {
      return definitions
    }

    const definition = require(path.join(definitionsPath, fileName))
    const name = fileName.replace('.json', '')
    definitions[name] = definition
    return definitions
  }, {})

  fs.writeFileSync(
    path.join(definitionsPath, 'index.json'),
    JSON.stringify(result),
    null,
    2
  )
}

compileDefinitions()
const specification = buildSpecification()

fs.writeFileSync(
  path.join(__dirname, 'test.swagger.json'),
  JSON.stringify(specification),
  null,
  2
)
