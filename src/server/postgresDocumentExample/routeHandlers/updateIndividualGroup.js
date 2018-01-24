const createObjectResponse = require('../../lib/api/utilities/createObjectResponse')

module.exports = function updateIndividualGroup({ controllers, request }) {
  return controllers
    .updateIndividualGroup({
      body: request.body,
      pathParams: request.pathParams,
    })
    .then(data => {
      return createObjectResponse({
        data,
        id: data.id,
        type: 'individualGroup',
      })
    })
}
