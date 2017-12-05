const Sequelize = require('sequelize')

module.exports = function individualGroup({ sequelize }) {
  return sequelize.define('IndividualGroup', {
    document: {
      type: Sequelize.JSONB,
    },
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    version: { allowNull: true, type: Sequelize.INTEGER },
  })
}
