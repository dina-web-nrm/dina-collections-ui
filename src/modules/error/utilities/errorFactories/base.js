import { ERROR_CODES } from '../../constants'

export default function createError({ context, error }) {
  const {
    errorCode,
    origin,
    statusCode,
    type,
    userInteraction = false,
  } = context

  return {
    error,
    errorCode: errorCode || ERROR_CODES.UNKNOWN,
    message: `ERROR - ${errorCode}, ${origin}, ${type}, \n\n ${JSON.stringify(
      error
    )}`,
    origin,
    statusCode,
    type,
    userInteraction,
  }
}
