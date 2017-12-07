import React from 'react'
import PropTypes from 'prop-types'
import { Field } from 'redux-form'

const NUMBER_TYPES = ['number', 'numberAsText']

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

const propTypes = {
  format: PropTypes.func,
  parse: PropTypes.func,
  type: PropTypes.string,
}
const defaultProps = {
  format: undefined,
  parse: undefined,
  type: undefined,
}

const FieldWrapper = ({ format, parse, type, ...rest }) => {
  const parseAsNumber = !parse && NUMBER_TYPES.includes(type)
  const formatAsString = !parse && NUMBER_TYPES.includes(type)

  return (
    <Field
      format={formatAsString ? formatToString : format}
      parse={parseAsNumber ? parseToNumber : parse}
      type={type}
      {...rest}
    />
  )
}

FieldWrapper.propTypes = propTypes
FieldWrapper.defaultProps = defaultProps

export default FieldWrapper
