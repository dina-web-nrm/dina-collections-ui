export default function fieldNamePathFactory(base) {
  return function buildFieldNamePath(name, index = 0) {
    return `${base}[${index}].${name}`
  }
}
