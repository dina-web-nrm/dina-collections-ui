module.exports = {
  createIndividualGroup: ({ controllers, request }) => {
    return controllers.createIndividualGroup(request.body.data).then(data => {
      return {
        data,
      }
    })
  },
  getIndividualGroups: ({ controllers, ...rest }) => {
    return controllers.testController().then(data => {
      return {
        data,
      }
    })
  },
}
