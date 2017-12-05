const createRequest = {}

module.exports = function createAuthenticateMiddleware({
  apiConfig,
  endpointConfig,
}) {
  return (req, res, next) => {
    next()
  }
}
