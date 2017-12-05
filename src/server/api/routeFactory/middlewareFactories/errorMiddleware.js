const createLog = require('../../../utilities/log')

const log = createLog('errorMiddleware')

module.exports = function createErrorMiddleware() {
  /* eslint-disable no-unused-vars */
  return (err, req, res, next) => {
    /* eslint-enable no-unused-vars */
    // ensure know error or pass on other error
    log.err(`Got api error: ${err.stack}`)
    // set headers
    // send response depending on headers
    // set cache if applicable
    res.status(500)
    res.send(err)
  }
}
