const { createCollectionsClient, login } = require('./utilities')
const individualGroups = require('./collections/individualGroups')

let authToken
let collectionsClient

return (
  login()
    .then(loginToken => {
      authToken = loginToken
    })
    .then(() => {
      collectionsClient = createCollectionsClient({
        authToken,
      })
    })
    .then(() => {
      return individualGroups({ collectionsClient })
    })
    // add new .then() for each test file
    .catch(err => console.log(err)) // eslint-disable-line no-console
)
