export default function parseResponse(response) {
  return response
    .json()
    .then(json => json, error => ({ error, response }))
    .then(json => {
      const { status } = response

      if (status >= 200 && status < 300) {
        return {
          json,
          status,
        }
      }

      const error = {
        json,
        status,
      }

      throw error
    })
}
