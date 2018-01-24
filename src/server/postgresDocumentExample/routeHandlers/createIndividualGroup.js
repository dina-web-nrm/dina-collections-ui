const createObjectResponse = require('../../lib/api/utilities/createObjectResponse')

module.exports = function createIndividualGroup({ controllers, request }) {
  return controllers
    .createIndividualGroup({ body: request.body })
    .then(data => {
      return createObjectResponse({
        data,
        id: data.id,
        type: 'individualGroup',
      })
    })
}
