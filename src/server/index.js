const createLog = require('./utilities/log')
const createApi = require('./api')
const createApp = require('./app')
const createConfig = require('./config')
const bootstrapDatalayer = require('./logic')
const createKeycloak = require('./auth/keycloak')

const config = createConfig()

const log = createLog('server')

bootstrapDatalayer({ config })
  .then(({ controllers }) => {
    const keycloak = createKeycloak({ config })

    const api = createApi({
      config,
      controllers,
      keycloak,
    })

    const app = createApp({
      api,
      config,
      keycloak,
    })
    return app.listen(config.api.port, () => {
      log.info(`Api listening to port ${config.api.port}`)
    })
  })
  .catch(err => {
    throw err
  })

process.on('uncaughtException', err => {
  log.crit('uncaughtException process exiting in 5000 ms')
  log.crit(err.stack)
  setTimeout(() => {
    process.exit(1)
  }, 10000)
})

process.on('unhandledRejection', err => {
  log.crit('unhandledRejection process exiting in 5000 ms')
  log.crit(err.stack)
  setTimeout(() => {
    process.exit(1)
  }, 10000)
})
