const Sequelize = require('sequelize')

module.exports = function featureObservation({ sequelize }) {
  return sequelize.define('FeatureObservation', {
    featureObservationText: { allowNull: true, type: Sequelize.STRING },
    // featureObservationType: Sequelize.STRING,
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },

    methodText: { allowNull: true, type: Sequelize.STRING },
  })
}
