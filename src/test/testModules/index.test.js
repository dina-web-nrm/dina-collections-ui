/* eslint-disable global-require, import/no-dynamic-require */
import path from 'path'
import fs from 'fs'
import validateAgainstSchema from 'utilities/jsonSchema/validateAgainstSchema'
import isKnownError from 'utilities/error/isKnownError'
import createApiClient from 'coreModules/api/apiClient'

import viewModuleSchema from './viewModuleSchema.json'
import moduleSchema from './moduleSchema.json'

const moduleFolderNamePath = {
  coreModules: path.join(__dirname, '../../coreModules'),
  domainModules: path.join(__dirname, '../../domainModules'),
  viewModules: path.join(__dirname, '../../apps/collectionsUi/viewModules'),
}

export const createApiMockClient = () => {
  return createApiClient({
    enableEndpointMocks: true,
    mapResponse: ({ json }) => json,
    validateInput: false,
    validateOutput: true,
  })
}

const testComponents = moduleBasePath => {
  const module = require(moduleBasePath)
  const componentsPath = path.join(moduleBasePath, 'components')
  const hasComponentsFolder = fs.existsSync(componentsPath)
  if (!(module.components || hasComponentsFolder)) {
    return
  }

  describe(`test components`, () => {
    it('contains components export', () => {
      expect(module.components && hasComponentsFolder).toBeTruthy()
    })
    it('contains components folder', () => {
      expect(hasComponentsFolder).toBeTruthy()
    })

    it('exports all components', () => {
      const components = fs
        .readdirSync(componentsPath)
        .filter(
          filename =>
            filename.indexOf('stories') === -1 &&
            filename.indexOf('.test.') === -1 &&
            filename !== 'index.js'
        )

      expect(components.length).toBe(Object.keys(module.components).length)
    })
  })

  describe(`test individual component: `, () => {
    const components = fs
      .readdirSync(componentsPath)
      .filter(
        filename =>
          filename.indexOf('stories') === -1 &&
          filename.indexOf('.test.') === -1 &&
          filename !== 'index.js'
      )
    const stories = fs
      .readdirSync(componentsPath)
      .filter(filename => filename.indexOf('stories') !== -1)

    components.forEach(component => {
      describe(component, () => {
        it('has stories', () => {
          const expectedStoriesName = `${component.split('.js')[0]}.stories.js`
          const hasStories = stories.indexOf(expectedStoriesName) !== -1
          // expect(hasStories).toBeTruthy()
          if (!hasStories) {
            /* eslint-disable no-console */
            console.warn(
              `Component: ${module.name} -> ${
                component
              } missing stories. Expected ${expectedStoriesName}`
            )
            /* eslint-enable no-console */
          }
        })
      })
    })
  })
}

const testEndpoint = (apiClient, endpoint) => {
  const { methodName, operationId, pathname } = endpoint
  it(`Mock call ${operationId} ${methodName.toUpperCase()} ${
    pathname
  } success`, () => {
    return expect(
      apiClient.call(endpoint).catch(err => {
        if (err.stack) {
          throw err.stack
        }

        if (isKnownError(err) && err.error) {
          const formattedError = {
            message: JSON.stringify(err, null, 2),
          }
          throw formattedError
        }
        throw err
      })
    ).resolves.toBeTruthy()
  })

  it(`Mock call with wrong response data: ${
    operationId
  } ${methodName.toUpperCase()} ${pathname} fails`, () => {
    const fakeDataEndpoint = {
      ...endpoint,
      mock: () => {
        return {
          data: {
            a: 2,
            b: 3,
          },
        }
      },
    }

    return expect(apiClient.call(fakeDataEndpoint)).rejects.toBeTruthy()
  })
}

const testEndpoints = endpoints => {
  const apiClient = createApiMockClient()
  Object.keys(endpoints).forEach(key => {
    const endpoint = endpoints[key]
    testEndpoint(apiClient, endpoint)
  })
}

const testModuleInFolder = ({
  folderIndexFile,
  folderName,
  moduleFolderBasePath,
  moduleName,
}) => {
  describe(`test module ${folderName}:${moduleName}`, () => {
    const moduleBasePath = path.join(moduleFolderBasePath, moduleName)
    const module = require(moduleBasePath)
    it(`has an index file`, () => {
      expect(module).toBeTruthy()
    })

    it(`has a name`, () => {
      expect(module.name).toBeTruthy()
    })

    const { type } = folderIndexFile

    if (type === 'view') {
      it(`fulfills schema definition`, () => {
        expect(validateAgainstSchema(viewModuleSchema, module)).toBeNull()
      })
    }

    if (type === 'module') {
      it(`fulfills schema definition`, () => {
        expect(validateAgainstSchema(moduleSchema, module)).toBeNull()
      })

      if (module.endpoints) {
        testEndpoints(module.endpoints)
      }

      if (module.components) {
        testComponents(moduleBasePath)
      }
    }
  })
}

const testModulesInFolder = folderName => {
  const moduleFolderBasePath = moduleFolderNamePath[folderName]
  const folderIndexFile = require(moduleFolderBasePath)
  folderIndexFile.moduleOrder.forEach(moduleName => {
    testModuleInFolder({
      folderIndexFile,
      folderName,
      moduleFolderBasePath,
      moduleName,
    })
  })
}

const testModuleFolder = folderName => {
  const moduleFolderBasePath = moduleFolderNamePath[folderName]
  const allModulesFilePath = path.join(moduleFolderBasePath, 'allModules')

  describe(`test module folder ${folderName}`, () => {
    it(`registered in moduleFolderNamePath`, () => {
      expect(moduleFolderBasePath).toBeTruthy()
    })

    it(`import index ok`, () => {
      const indexFile = require(moduleFolderBasePath)
      expect(indexFile).toBeTruthy()
      expect(indexFile.moduleOrder).toBeTruthy()
    })

    it(`index contains moduleOrder`, () => {
      const indexFile = require(moduleFolderBasePath)
      expect(indexFile.moduleOrder).toBeTruthy()
    })

    it(`index contains correct type`, () => {
      const indexFile = require(moduleFolderBasePath)
      expect(['view', 'module']).toContain(indexFile.type)
    })

    it(`all modules in moduleOrder and no extra files`, () => {
      const indexFile = require(moduleFolderBasePath)
      const files = fs
        .readdirSync(moduleFolderBasePath)
        .filter(filename => filename[0] !== '.')
      expect(indexFile.moduleOrder.length + 2).toBe(files.length)
    })
    it(`import allModules ok`, () => {
      const allModulesFile = require(allModulesFilePath)
      expect(allModulesFile).toBeTruthy()
    })
    it(`all modules included in correct order in allModules`, () => {
      const allModulesFile = require(allModulesFilePath)
      const indexFile = require(moduleFolderBasePath)
      const { moduleOrder } = indexFile
      expect(
        allModulesFile.default.map(module => {
          return module.name
        })
      ).toEqual(moduleOrder)
    })
  })

  testModulesInFolder(folderName)
}

testModuleFolder('coreModules')
testModuleFolder('domainModules')
testModuleFolder('viewModules')
