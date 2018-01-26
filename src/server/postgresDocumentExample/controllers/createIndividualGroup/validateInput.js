module.exports = function validateInput(data) {
  if (!data) {
    const error = new Error('body is required')
    error.status = 400
    throw error
  }
  const catalogedUnit = data.additionalData[0].attributes

  if (!catalogedUnit.catalogNumber) {
    const error = new Error('catalogNumber is required')
    error.status = 400
    throw error
  }
}
