export default function createModelLink({ version = 1, modelName }) {
  return `/docs/models/${version}/${modelName}`
}
