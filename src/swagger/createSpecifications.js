const fs = require('fs')
const path = require('path')
const buildSwaggerSpecification = require('./factories/createSwaggerSpecification')
const buildModels = require('./factories/createModels')

const specification = buildSwaggerSpecification()

const models = buildModels()

fs.writeFileSync(
  path.join(__dirname, 'build', 'test.swagger.json'),
  JSON.stringify(specification, null, 2)
)

fs.writeFileSync(
  path.join(__dirname, 'build', 'test.models.json'),
  JSON.stringify(models, null, 2)
)
