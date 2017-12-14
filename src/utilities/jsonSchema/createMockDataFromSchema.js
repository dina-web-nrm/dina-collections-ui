const importFaker = () => require('json-schema-faker') // eslint-disable-line global-require

module.exports = function createMockDataFromSchema(schema, models) {
  return importFaker().then(jsf => {
    const modelsToUse = Object.keys(models).map(moduleKey => {
      return models[moduleKey]
    })
    const mock = jsf(schema, modelsToUse)
    return mock
  })
}
