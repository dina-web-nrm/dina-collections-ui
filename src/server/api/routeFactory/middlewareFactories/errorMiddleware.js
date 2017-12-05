module.exports = function createErrorMiddleware({ apiConfig, enpointConfig }) {
  /* eslint-disable no-unused-vars */
  return (err, req, res, next) => {
    /* eslint-enable no-unused-vars */
    // ensure know error or pass on other error

    const { data } = res.locals.result
    // set headers
    // send response depending on headers
    // set cache if applicable
    res.status(500)
    res.send(data)
  }
}
