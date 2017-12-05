const Sequelize = require('sequelize')

module.exports = function catalogedUnit({ sequelize }) {
  return sequelize.define('catalogedUnit', {
    catalogNumber: { allowNull: false, type: Sequelize.STRING },
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    // physicalUnits: Sequelize.STRING,
    publishRecord: {
      allowNull: false,
      default: false,
      type: Sequelize.BOOLEAN,
    },

    remarks: { allowNull: true, type: Sequelize.STRING },
    storedUnderTaxonName: { allowNull: true, type: Sequelize.STRING },
  })
}
