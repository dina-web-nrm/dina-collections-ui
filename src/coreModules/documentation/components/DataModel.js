import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Model from './Model'
import Property from './Property'

import specification from 'dina-schema/build/openApi.json'

const propTypes = {
  something: PropTypes.string.isRequired,
}

const defaultProps = {}

class DataModel extends Component {
  render() {
    const { match } = this.props

    const models = Object.keys(specification.components.schemas)
      .map(key => {
        return { key, ...specification.components.schemas[key] }
      })
      .filter(model => {
        return model.key === match.params.modelId
      })

    if (match.params.parameterId) {
      const model = models.find(m => {
        return m.key === match.params.modelId
      })

      // const model = specification.components.schemas[match.params.modelId]
      const property = model.properties[match.params.parameterId]
      if (model && property) {
        return (
          <div>
            <Property
              model={model}
              property={{ ...property, key: match.params.parameterId }}
            />
          </div>
        )
      }
    }

    return (
      <div>
        {models.map(model => {
          return <Model model={model} />
        })}
      </div>
    )
  }
}

DataModel.propTypes = propTypes
DataModel.defaultProps = defaultProps

export default DataModel
