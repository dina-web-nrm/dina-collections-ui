import decorateAdditionalProperties from './decorateAdditionalProperties'
import transform from './transform'

export default function apiErrorMapper(ajvErrors) {
  if (!ajvErrors) {
    return ajvErrors
  }
  return ajvErrors.map(decorateAdditionalProperties).map(transform)
}
