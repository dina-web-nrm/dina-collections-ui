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
    <Segment id={model.key} basic>
      <h2>{model.key}</h2>
      <p>{model.description || 'Model description'}</p>
      <PropertyOverview model={model} properties={properties} />
    </Segment>
  )
}

Model.propTypes = propTypes
Model.defaultProps = defaultProps

export default Model

// <Segment inverted>
//   {properties.map(property => {
//     return <Property model={model} property={property} />
//   })}
// </Segment>
