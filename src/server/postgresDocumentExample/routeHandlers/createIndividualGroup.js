const createObjectResponse = require('../../lib/api/utilities/createObjectResponse')

module.exports = function createIndividualGroup({ controllers, request }) {
  return controllers.createIndividualGroup(request.body.data).then(data => {
    return createObjectResponse({ data, id: data.id, type: 'individualGroup' })
  })
}
