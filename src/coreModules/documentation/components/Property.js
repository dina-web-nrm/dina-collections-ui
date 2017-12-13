import React from 'react'
import PropTypes from 'prop-types'
import { Segment } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import createModelLink from '../utilities/createModelLink'

const propTypes = {
  property: PropTypes.object.isRequired,
}

const defaultProps = {}

const Property = ({ model, property }) => {
  const id = `${model.key}.${property.key}`

  return (
    <Segment id={id}>
      <h2>{property.key || 'Property title'}</h2>
      <Link
        className="item"
        to={createModelLink({
          modelName: model.key,
        })}
      >
        Model: {model.key}
      </Link>
      <p>{property.description || 'Property description'}</p>
      <p>{JSON.stringify(property || {}, null, 2)}</p>
    </Segment>
  )
}

Property.propTypes = propTypes
Property.defaultProps = defaultProps

export default Property
