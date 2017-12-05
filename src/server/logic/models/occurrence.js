const Sequelize = require('sequelize')

module.exports = function occurrence({ sequelize }) {
  return sequelize.define('occurrence', {
    collectorsText: { allowNull: true, type: Sequelize.STRING },
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    localityText: { allowNull: true, type: Sequelize.STRING },
    // featureObservations: { allowNull: true, type: Sequelize.STRING },
    // identifications: { allowNull: true, type: Sequelize.STRING },
    // occurrences
    // physicalUnits
    version: { allowNull: true, type: Sequelize.INTEGER },
  })
}
