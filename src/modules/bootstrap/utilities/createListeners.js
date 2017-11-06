const setupListeners = ({ newModules }) => {
  return newModules.reduce((listeners, module) => {
    const listenerFactory = module.listener
    const moduleName = module.name
    if (listenerFactory && listenerFactory.start) {
      return {
        ...listeners,
        [moduleName]: {
          start: listenerFactory.start,
          started: false,
          stop: null,
        },
      }
    }
    return listeners
  }, {})
}

export default function createListeners({
  listenerMap,
  newModules = [],
  removeModules = [],
}) {
  const newListners = setupListeners({ newModules })
  const newListnerMap = {
    ...listenerMap,
    ...newListners,
  }

  removeModules.forEach(module => {
    const { name } = module
    if (newListnerMap[name]) {
      const { stop } = newListnerMap[name]
      if (stop) {
        stop()
      }
      delete newListnerMap[name] // eslint-disable-line no-param-reassign
    }
  })
  return newListnerMap
}
