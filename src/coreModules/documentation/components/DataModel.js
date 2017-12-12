import React, { Component } from 'react'
import PropTypes from 'prop-types'

import openApiSpec from 'dina-schema/build/openApi.json'
import { createModuleTranslate } from 'coreModules/i18n/components'
import Model from './Model'

const ModuleTranslate = createModuleTranslate('documentation')

const propTypes = {
  something: PropTypes.string.isRequired,
}

const defaultProps = {}

class DataModel extends Component {
  render() {
    console.log('openApiSpec', openApiSpec)

    const models = Object.keys(openApiSpec.components.schemas).map(key => {
      return { key, ...openApiSpec.components.schemas[key] }
    })
    return (
      <div>
        <div>sidebar</div>
        <div>
          {models.map(model => {
            return <Model model={model} />
          })}
        </div>
      </div>
    )
  }
}

DataModel.propTypes = propTypes
DataModel.defaultProps = defaultProps

export default DataModel
