import { isKnownError } from 'utilities/error'

export default function errorMiddleware({ debug = true } = {}) {
  return () => next => action => {
    const result = next(action)
    if (!debug) {
      return result
    }
    if (action.error) {
      if (isKnownError(action.payload)) {
        console.log(`Error in action ${action.type}:`, action.payload) // eslint-disable-line no-console
      } else if (process.env.NODE_ENV === 'development') {
        console.log(action.payload) // eslint-disable-line no-console
      }
    }
    return result
  }
}
