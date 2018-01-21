module.exports = function createIndividualGroup({ controllers, request }) {
  return controllers.createIndividualGroup(request.body.data).then(data => {
    return {
      data,
    }
  })
}
