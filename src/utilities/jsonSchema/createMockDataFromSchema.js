export const importFaker = () => import('json-schema-faker')

export default function createMockDataFromSchema(schema) {
  return importFaker().then(jsf => {
    return jsf(schema)
  })
}
