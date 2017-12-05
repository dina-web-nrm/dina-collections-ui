const Sequelize = require('sequelize')

module.exports = function createDb({ config }) {
  const { database, password, username } = config.db
  const sequelize = new Sequelize(database, username, password, {
    dialect: 'postgres',
    operatorsAliases: false,
  })
  return sequelize
    .authenticate()
    .then(() => {
      console.log('Connection has been established successfully.')
      return sequelize
    })
    .catch(err => {
      console.error('Unable to connect to the database:', err)
      return sequelize
    })
}
