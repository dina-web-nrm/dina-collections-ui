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

function compileParameters() {
  const parametersPath = path.join(__dirname, 'specification', 'parameters')
  const files = fs.readdirSync(parametersPath)
  const result = files.reduce((parameters, fileName) => {
    if (fileName === 'index.json') {
      return parameters
    }

    const parameter = require(path.join(parametersPath, fileName))
    const name = fileName.replace('.json', '')
    parameters[name] = parameter
    return parameters
  }, {})

  fs.writeFileSync(
    path.join(parametersPath, 'index.json'),
    JSON.stringify(result),
    null,
    2
  )
}

function compilePaths() {
  const pathsPath = path.join(__dirname, 'specification', 'paths')
  const files = fs.readdirSync(pathsPath)
  const result = files.reduce((paths, fileName) => {
    if (fileName === 'index.json') {
      return paths
    }

    const parameter = require(path.join(pathsPath, fileName))
    const name = fileName
      .replace('.json', '')
      .split(':')
      .join('/')
    paths[`/${name}`] = parameter
    return paths
  }, {})

  fs.writeFileSync(
    path.join(pathsPath, 'index.json'),
    JSON.stringify(result),
    null,
    2
  )
}

compileDefinitions()
compileParameters()
compilePaths()
const specification = buildSpecification()

fs.writeFileSync(
  path.join(__dirname, 'test.swagger.json'),
  JSON.stringify(specification),
  null,
  2
)
