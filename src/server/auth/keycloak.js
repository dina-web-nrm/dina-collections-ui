const Keycloak = require('keycloak-connect')

module.exports = function createKeycloak(keycloakOptions) {
  const keycloak = new Keycloak({}, keycloakOptions)
  keycloak.accessDenied = (req, res) => {
    res.status(403)
    res.send({
      ERROR_CODE: 'ACCESS_DENIED',
    })
  }
  return keycloak
}
