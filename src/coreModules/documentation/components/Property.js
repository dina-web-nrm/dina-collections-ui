import React from 'react'
import PropTypes from 'prop-types'
import { Segment } from 'semantic-ui-react'

const propTypes = {
  property: PropTypes.object.isRequired,
}

const defaultProps = {}

const Property = ({ property }) => {
  return (
    <Segment>
      <h2>{property.key || 'Property title'}</h2>
      <p>{property.description || 'Property description'}</p>
      <p>{JSON.stringify(property || {}, null, 2)}</p>
    </Segment>
  )
}

Property.propTypes = propTypes
Property.defaultProps = defaultProps

export default Property
