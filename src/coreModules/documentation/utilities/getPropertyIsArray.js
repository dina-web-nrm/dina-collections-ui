export default function getPropertyIsModel(property) {
  const { type } = property
  return type === 'array'
}
