const createModel = require('../../../../lib/postgres/models/createModel')

module.exports = function individualGroup({ sequelize }) {
  return createModel({
    name: 'IndividualGroup',
    schemaModelName: 'individualGroup',
    schemaVersion: '1.0.1',
    sequelize,
  })
}
