export default function createParameterLink({
  version = 1,
  modelName,
  parameterName,
}) {
  return `/docs/models/${version}/${modelName}/${parameterName}`
}
