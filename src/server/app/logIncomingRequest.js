const createLog = require('../utilities/log')

const log = createLog('logIncomingRequest')

module.exports = (req, res, next) => {
  res.locals.id = '1234'
  log.info(`${res.locals.id}: Receive request ${req.method} - ${req.url}`)
  next()
}
