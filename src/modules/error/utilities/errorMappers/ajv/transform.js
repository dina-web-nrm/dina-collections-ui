import { JSON_SCHEMA_ERROR_CODES } from '../../../constants'

export default function transform(error) {
  const keyword = error.keyword
  const errorCode = JSON_SCHEMA_ERROR_CODES[keyword]
  if (!keyword || !errorCode) {
    console.error(`Missing errorCode for keyword ${keyword}`) // eslint-disable-line no-console
  }

  return {
    errorCode: errorCode || keyword,
    fullPath: error.fullPath,
    originalError: error.originalError,
    params: error.params,
  }
}
