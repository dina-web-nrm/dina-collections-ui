const createLog = require('../../../utilities/log')

const log = createLog('errorMiddleware')

module.exports = function createErrorMiddleware() {
  /* eslint-disable no-unused-vars */
  return (err, req, res, next) => {
    /* eslint-enable no-unused-vars */
    // ensure know error or pass on other error
    console.log('err', err)
    log.err(`Got api error: ${err.stack}`)
    // set headers
    // send response depending on headers
    // set cache if applicable
    if (err.status === 400) {
      res.status(400)
      return res.send({
        errors: err.errors,
        message: err.message,
        originalKey: err.name,
      })
    }
    res.status(500)
    return res.send(err.stack)
  }
}
