const Sequelize = require('sequelize')

module.exports = function individualGroup({ sequelize }) {
  return sequelize.define('IndividualGroup', {
    diff: {
      type: Sequelize.JSONB,
    },
    document: {
      type: Sequelize.JSONB,
    },

    id: {
      type: Sequelize.INTEGER,
    },
    version: { allowNull: true, type: Sequelize.INTEGER },
    versionId: {
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
  })
}
