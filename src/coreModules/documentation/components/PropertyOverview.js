import React from 'react'
import PropTypes from 'prop-types'

import { Icon, Label, Menu, Table } from 'semantic-ui-react'

const propTypes = {
  properties: PropTypes.array.isRequired,
}

const defaultProps = {}

const PropertyOverview = ({ properties }) => {
  console.log('properties', properties)

  return (
    <Table celled>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Header 1</Table.HeaderCell>
          <Table.HeaderCell>Header 2</Table.HeaderCell>
          <Table.HeaderCell>Header 3</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {properties.map(property => {
          return (
            <Table.Row>
              <Table.Cell>${property.key}</Table.Cell>
              <Table.Cell>Cell</Table.Cell>
              <Table.Cell>Cell</Table.Cell>
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
