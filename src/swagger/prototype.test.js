import Ajv from 'ajv'
import definitions from './test.models.json'

const { catalogedUnit } = definitions

const catalogedUnitData = {
  id: 1234,
  catalogNumber: 'hej',
  individualGroup: {
    id: 123,
  },
}

describe('should throw', () => {
  it('does not do correct stuff', () => {
    var ajv = Ajv()
    Object.keys(definitions).forEach(key => {
      ajv.addSchema(definitions[key], key)
    })

    var validate = ajv.compile(catalogedUnit)
    var valid = validate(catalogedUnitData)
    if (!valid) {
      console.log('validate.errors', validate.errors)
      throw new Error(JSON.stringify(validate.errors))
    }

    expect(1).toEqual(1)
  })
})
