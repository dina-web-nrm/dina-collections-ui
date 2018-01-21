module.exports = function getIndividualGroups({ controllers }) {
  return controllers.testController().then(data => {
    return {
      data,
    }
  })
}
