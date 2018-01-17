import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Field } from 'redux-form'
import createNotificationAC from 'coreModules/notifications/actionCreators/createNotification'

const PARSE_AS_NUMBER_TYPES = ['numberAsText']
const FORMAT_AS_STRING_TYPES = ['numberAsText']

const parseToNumber = value => {
  if (value === '' || value === undefined || value === null) {
    return value
  }

  return Number(value)
}

const formatToString = value => {
  if (value === '' || value === undefined || value === null) {
    return value
  }

  return String(value)
}

const mapDispatchToProps = { createNotification: createNotificationAC }

const propTypes = {
  createNotification: PropTypes.func.isRequired,
  format: PropTypes.func,
  parse: PropTypes.func,
  type: PropTypes.string,
}
const defaultProps = {
  format: undefined,
  parse: undefined,
  type: undefined,
}

const FieldWrapper = ({ createNotification, format, parse, type, ...rest }) => {
  const parseAsNumber = !parse && PARSE_AS_NUMBER_TYPES.includes(type)
  const formatAsString = !format && FORMAT_AS_STRING_TYPES.includes(type)

  return (
    <Field
      createNotification={createNotification}
      format={formatAsString ? formatToString : format}
      parse={parseAsNumber ? parseToNumber : parse}
      type={type}
      {...rest}
    />
  )
}

FieldWrapper.propTypes = propTypes
FieldWrapper.defaultProps = defaultProps

export default connect(undefined, mapDispatchToProps)(FieldWrapper)
