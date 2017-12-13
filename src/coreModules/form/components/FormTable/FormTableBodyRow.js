import React from 'react'
import PropTypes from 'prop-types'
import { Table } from 'semantic-ui-react'

import createLog from 'utilities/log'

const log = createLog(`modules:form:components:FormTable:FormTableBodyRow`)

const propTypes = {
  cells: PropTypes.node.isRequired,
}

const FormTableBodyRow = ({ cells }) => {
  log.render('Render')
  return <Table.Row>{cells}</Table.Row>
}

FormTableBodyRow.propTypes = propTypes

export default FormTableBodyRow
