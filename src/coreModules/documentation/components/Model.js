import React from 'react'
import PropTypes from 'prop-types'
import { Segment } from 'semantic-ui-react'

import Property from './Property'
import PropertyOverview from './PropertyOverview'

const propTypes = {
  model: PropTypes.object.isRequired,
}

const defaultProps = {}

const Model = ({ model }) => {
  const properties = Object.keys(model.properties).map(key => {
    return { key, ...model.properties[key] }
  })
  return (
    <Segment>
      <h2>{model.key}</h2>
      <p>{model.description || 'Model description'}</p>
      <PropertyOverview properties={properties} />
      {properties.map(property => {
        return <Property property={property} />
      })}
    </Segment>
  )
}

Model.propTypes = propTypes
Model.defaultProps = defaultProps

export default Model
