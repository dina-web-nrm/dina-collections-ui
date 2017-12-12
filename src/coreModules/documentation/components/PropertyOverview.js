import React from 'react'
import PropTypes from 'prop-types'

import { Icon, Label, Menu, Table } from 'semantic-ui-react'

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

const Type = ({ property }) => {
  const { type } = property

  if (type === 'array') {
    return (
      <a href={`#${getArrayLink(property)}`}>{`<ARRAY> ${
        property.items.$ref
      }`}</a>
    )
  }

  if (property.$ref) {
    return (
      <a href={`#${getModelLink(property)}`}>{`<MODEL> ${property.$ref}`}</a>
    )
  }

  return type || ''
}

const PropertyOverview = ({ properties }) => {
  console.log('properties', properties[0])

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
              <Table.Cell>{property.key}</Table.Cell>
              <Table.Cell>
                <Type property={property} />
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
