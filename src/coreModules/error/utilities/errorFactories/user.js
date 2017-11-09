import { ERROR_CODES, ORIGINS, TYPES } from '../../constants'

import createError from './base'

export default function createFormError(error) {
  const errorCode =
    (error.errorCode && ERROR_CODES[error.errorCode]) ||
    ERROR_CODES.DEFAULT_USER_ERROR
  const context = {
    errorCode, // import from consts
    origin: ORIGINS.CLIENT,
    statusCode: null,
    type: TYPES.USER,
  }
  return createError({
    context,
    error,
  })
}
