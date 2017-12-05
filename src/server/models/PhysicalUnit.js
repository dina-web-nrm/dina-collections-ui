const Sequelize = require('sequelize')

module.exports = function physicalUnit({ sequelize }) {
  return sequelize.define('PhysicalUnit', {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    physicalUnitText: { allowNull: true, type: Sequelize.STRING },
  })
}
