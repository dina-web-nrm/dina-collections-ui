const path = require('path')
const fs = require('fs')

module.exports = function createPaths() {
  const pathsPath = path.join(__dirname, '../', 'specification', 'paths')
  const files = fs.readdirSync(pathsPath)
  const result = files.reduce((paths, fileName) => {
    if (fileName === 'index.json') {
      return paths
    }

    const parameter = require(path.join(pathsPath, fileName))
    const name = fileName
      .replace('.json', '')
      .split(':')
      .join('/')
    paths[`/${name}`] = parameter
    return paths
  }, {})

  return result
}
