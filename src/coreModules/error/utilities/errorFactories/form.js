import objectPath from 'object-path'
import { ERROR_CODES, ORIGINS, TYPES } from '../../constants'
import createError from './base'

export const createReduxFormParameterError = transformedAjvError => {
  const { fullPath, errorCode, params } = transformedAjvError
  return {
    errorCode,
    fullPath,
    params,
  }
}

export const transformToReduxFormError = transformedAjvErrors => {
  return transformedAjvErrors.reduce((reduxFormError, transformedAjvError) => {
    const { fullPath } = transformedAjvError
    objectPath.set(
      reduxFormError,
      fullPath,
      createReduxFormParameterError(transformedAjvError)
    )
    return reduxFormError
  }, {})
}

export default function createFormError(error) {
  const context = {
    errorCode: ERROR_CODES.FORM_VALIDATION_ERROR, // import from consts
    origin: ORIGINS.CLIENT,
    statusCode: null,
    type: TYPES.FORM,
  }

  const formError = createError({
    context,
    error,
  })

  return transformToReduxFormError(formError.error)
}
