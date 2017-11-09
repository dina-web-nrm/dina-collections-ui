export default function parseJSON(response) {
  return response
    .json()
    .then(json => ({ json, response }), error => ({ error, response }))
}
