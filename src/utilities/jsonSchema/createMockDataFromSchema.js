export const importFaker = () => import('json-schema-faker')

export default function createMockDataFromSchema(schema, models) {
  return importFaker().then(jsf => {
    const modelsToUse = Object.keys(models).map(moduleKey => {
      return models[moduleKey]
    })
    const mock = jsf(schema, modelsToUse)
    return mock
  })
}
