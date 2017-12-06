const Sequelize = require('sequelize')

module.exports = function identification({ sequelize }) {
  return sequelize.define('Identification', {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    identificationRemarks: { allowNull: true, type: Sequelize.STRING },
    identificationText: { allowNull: true, type: Sequelize.STRING },
    identifiedAsVerbatim: { allowNull: true, type: Sequelize.STRING },
    identifiedByAgentText: { allowNull: true, type: Sequelize.STRING },
    identifiedDay: { allowNull: true, type: Sequelize.INTEGER },
    identifiedMonth: { allowNull: true, type: Sequelize.INTEGER },
    identifiedTaxonNameStandardized: {
      allowNull: true,
      type: Sequelize.STRING,
    },
    identifiedYear: { allowNull: true, type: Sequelize.INTEGER },
    isCurrentIdentification: { allowNull: true, type: Sequelize.BOOLEAN },
    version: { allowNull: true, type: Sequelize.INTEGER },
    // individualGroup: Sequelize.STRING,
  })
}
