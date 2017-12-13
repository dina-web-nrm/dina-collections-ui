import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Table } from 'semantic-ui-react'

import createParameterLink from '../../utilities/createParameterLink'
import createModelLink from '../../utilities/createModelLink'

const propTypes = {
  properties: PropTypes.array.isRequired,
}

const defaultProps = {}

const getArrayLink = property => {
  const segments =
    property.items && property.items.$ref && property.items.$ref.split('/')

  if (!segments) {
    return ''
  }

  const len = segments.length

  if (!len) {
    return ''
  }

  return segments[len - 1]
}

const getModelLink = property => {
  const segments = property && property.$ref && property.$ref.split('/')

  if (!segments) {
    return ''
  }

  const len = segments.length

  if (!len) {
    return ''
  }

  return segments[len - 1]
}

const Type = ({ property, version }) => {
  const { type } = property

  if (type === 'array') {
    return (
      <Link
        className="item"
        to={createModelLink({
          modelName: getArrayLink(property),
          version,
        })}
      >
        {`<ARRAY> ${getArrayLink(property)}`}
      </Link>
    )
  }

  if (property.$ref) {
    return (
      <Link
        className="item"
        to={createModelLink({
          modelName: getModelLink(property),
          version,
        })}
      >
        {`<MODEL> ${getModelLink(property)}`}
      </Link>
    )
  }

  return type || ''
}

const PropertyOverview = ({ properties, model, version }) => {
  return (
    <Table celled>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Key</Table.HeaderCell>
          <Table.HeaderCell>Type</Table.HeaderCell>
          <Table.HeaderCell>Example</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {properties.map(property => {
          return (
            <Table.Row>
              <Table.Cell>
                <Link
                  to={createParameterLink({
                    modelName: model.key,
                    parameterName: property.key,
                    version,
                  })}
                >
                  {property.key}
                </Link>
              </Table.Cell>
              <Table.Cell>
                <Type property={property} version={version} />
              </Table.Cell>
              <Table.Cell>{property.example}</Table.Cell>
            </Table.Row>
          )
        })}
      </Table.Body>
    </Table>
  )
}

PropertyOverview.propTypes = propTypes
PropertyOverview.defaultProps = defaultProps

export default PropertyOverview
