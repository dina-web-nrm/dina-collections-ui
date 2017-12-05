module.exports = function testController({ sequelize }) {
  const { featureObservationType } = sequelize.models
  return () => {
    return featureObservationType
      .create({
        featureObservationTypeName: { a: '1234' },
      })
      .then(result => {
        return Promise.resolve(result)
      })
      .catch(err => {
        throw err
      })
  }
}
