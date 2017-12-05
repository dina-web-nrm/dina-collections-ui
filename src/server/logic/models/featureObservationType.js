const Sequelize = require('sequelize')

module.exports = function featureObservationType({ sequelize }) {
  return sequelize.define('featureObservationType', {
    featureObservationTypeName: { allowNull: true, type: Sequelize.STRING },
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
  })
}
