export default function fieldNamePathFactory(base, scope = '') {
  return function buildFieldNamePath(name, index = 0) {
    if (scope) {
      return `${base}[${index}].${scope}.${name}`
    }

    return `${base}[${index}].${name}`
  }
}
