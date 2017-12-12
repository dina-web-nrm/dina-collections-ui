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

const testModuleFolder = folderName => {
  const moduleFolderBasePath = moduleFolderNamePath[folderName]
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
      const files = fs.readdirSync(moduleFolderBasePath)
      expect(indexFile.moduleOrder.length + 1).toBe(files.length)
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

testModulesInFolder('coreModules')
testModulesInFolder('domainModules')
testModulesInFolder('viewModules')

testModuleFolder('coreModules')
testModuleFolder('domainModules')
testModuleFolder('viewModules')
