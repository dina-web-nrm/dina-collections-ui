const Sequelize = require('sequelize')

module.exports = function individualGroup({ sequelize }) {
  return sequelize.define('individualGroup', {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    // featureObservations: { allowNull: true, type: Sequelize.STRING },
    // identifications: { allowNull: true, type: Sequelize.STRING },
    // occurrences
    // physicalUnits
    version: { allowNull: true, type: Sequelize.INTEGER },
  })
}
