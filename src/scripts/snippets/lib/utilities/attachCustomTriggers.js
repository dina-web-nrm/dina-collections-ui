module.exports = (config, templatesDefinitions) => {
  if (!(config && config.triggers)) {
    return templatesDefinitions
  }
  return templatesDefinitions.map(templatesDefinition => {
    const name = templatesDefinition.name
    const customTrigger = config.triggers[name]
    if (customTrigger) {
      templatesDefinition.customTrigger = customTrigger // eslint-disable-line no-param-reassign
    }
    return templatesDefinition
  })
}
