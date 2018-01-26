module.exports = function validateInput({ data, pathParams }) {
  if (!pathParams || !pathParams.id) {
    const error = new Error('pathParams.id is required')
    error.status = 400
    throw error
  }

  if (!data) {
    const error = new Error('body is required')
    error.status = 400
    throw error
  }
}
