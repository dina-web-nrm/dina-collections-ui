const { ERROR_CODES } = require('../constants')

module.exports = function createError({ context, error }) {
  const {
    errorCode,
    origin,
    statusCode,
    type,
    userInteraction = false,
    verbose = false,
  } = context
  const message = verbose
    ? `ERROR - ${errorCode}, ${origin}, ${type}, \n\n ${JSON.stringify(error)}`
    : `ERROR - ${errorCode}, ${origin}, ${type}`

  return {
    _known: true,
    error,
    errorCode: errorCode || ERROR_CODES.UNKNOWN,
    message,
    origin,
    statusCode,
    type,
    userInteraction,
  }
}
