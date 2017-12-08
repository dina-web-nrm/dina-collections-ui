import { ERROR_CODES, ORIGINS, TYPES } from '../constants'

import createError from './base'

export default function createFormError(error) {
  const errorCode =
    (error.errorCode && ERROR_CODES[error.errorCode]) ||
    ERROR_CODES.DEFAULT_API_ERROR
  const context = {
    errorCode, // import from consts
    origin: ORIGINS.SERVER,
    statusCode: error.statusCode || null,
    type: TYPES.API,
  }
  return createError({
    context,
    error,
  })
}
