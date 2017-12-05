const createArrayResponse = require('../../lib/api/utilities/createArrayResponse')

module.exports = function getIndividualGroups({ controllers, request }) {
  return controllers.getIndividualGroups(request.queryParams).then(items => {
    return createArrayResponse({ items, type: 'individualGroup' })
  })
}
