const Sequelize = require('sequelize')

module.exports = function initializeUser({ sequelize }) {
  return sequelize
  // return sequelize.define('project', {
  //   description: Sequelize.TEXT,
  //   title: Sequelize.STRING,
  // })
}
