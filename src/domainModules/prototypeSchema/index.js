var Ajv = require('ajv')
const catalogedUnitSchema = require('./catalogedUnit.json')
const individualGroupSchema = require('./individualGroup.json')

var catalogedUnitData = {
  id: 1234,
  catalogNumber: 'hej',
  individualGroup: {
    version: '123',
  },
}

var ajv = Ajv()
ajv.addSchema(individualGroupSchema)
ajv.addSchema(catalogedUnitSchema)

// var Ajv = require('ajv');
// var ajv = new Ajv(); // options can be passed, e.g. {allErrors: true}
var validate = ajv.compile(catalogedUnitSchema)
var valid = validate(catalogedUnitData)
if (!valid) console.log(validate.errors)
console.log('valid', valid)
