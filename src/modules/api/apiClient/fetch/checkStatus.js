export default function checkStatus({ response, json }) {
  if (response.status >= 200 && response.status < 300) {
    return json
  }

  const error = {
    ...json,
  }

  throw error
}
