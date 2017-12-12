import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Table } from 'semantic-ui-react'

import createLog from 'utilities/log'
import FormTableBodyRow from './FormTableBodyRow'
import FormTableHeaderRow from './FormTableHeaderRow'

const log = createLog(`modules:form:components:FormTable`)

const propTypes = {
  columnHeaderTextKeys: PropTypes.arrayOf(PropTypes.string.isRequired)
    .isRequired,
  footer: PropTypes.node,
  getRowCells: PropTypes.func.isRequired,
  numberOfItemsToSkip: PropTypes.number,
  numberOfRows: PropTypes.number.isRequired,
}
const defaultProps = {
  footer: undefined,
  numberOfItemsToSkip: 0,
}

class FormTable extends Component {
  shouldComponentUpdate(nextProps) {
    return this.props.numberOfRows !== nextProps.numberOfRows
  }

  render() {
    const {
      columnHeaderTextKeys,
      footer,
      getRowCells,
      numberOfItemsToSkip,
      numberOfRows,
    } = this.props

    let rowIndices = []
    for (let index = 0; index < numberOfRows; index += 1) {
      rowIndices.push(index)
    }
    rowIndices = rowIndices.slice(numberOfItemsToSkip)

    log.render('Render')
    return (
      <Table celled compact striped>
        <Table.Header>
          <FormTableHeaderRow columnHeaderTextKeys={columnHeaderTextKeys} />
        </Table.Header>

        <Table.Body>
          {rowIndices.map(index => {
            return (
              <FormTableBodyRow
                cells={getRowCells(index, numberOfRows)}
                key={index}
              />
            )
          })}
        </Table.Body>

        {footer && footer}
      </Table>
    )
  }
}

FormTable.propTypes = propTypes
FormTable.defaultProps = defaultProps

export default FormTable
