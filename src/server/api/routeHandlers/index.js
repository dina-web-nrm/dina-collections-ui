module.exports = {
  getIndividualGroups: ({ controllers, ...rest }) => {
    console.log('rest', rest)
    return controllers.testController().then(data => {
      return {
        data,
      }
    })
  },
}
