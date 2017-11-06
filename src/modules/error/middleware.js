import { isKnownError } from './utilities'

export default function errorMiddleware({ debug = true } = {}) {
  return () => next => action => {
    const result = next(action)
    if (!debug) {
      return result
    }
    if (action.error && isKnownError(action.payload)) {
      console.log(`Error in action ${action.type}:`, action.payload) // eslint-disable-line no-console
    }
    return result
  }
}
