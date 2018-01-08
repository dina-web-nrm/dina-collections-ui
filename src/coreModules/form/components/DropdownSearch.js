import React from 'react'
import PropTypes from 'prop-types'
import { Dropdown, Form } from 'semantic-ui-react'

import { FormFieldError } from '../../error/components'

const propTypes = {
  errorScope: PropTypes.string,
  helpText: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  initialText: PropTypes.string,
  input: PropTypes.shape({
    name: PropTypes.string.isRequired,
    value: PropTypes.string,
  }).isRequired,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  meta: PropTypes.shape({
    error: PropTypes.object,
    touched: PropTypes.bool.isRequired,
  }).isRequired,
  module: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      value: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
        .isRequired,
    }).isRequired
  ).isRequired,
  required: PropTypes.bool,
}
const defaultProps = {
  errorScope: undefined,
  helpText: undefined,
  initialText: undefined,
  label: undefined,
  module: undefined,
  required: false,
}

function DropdownSearch({
  errorScope,
  helpText,
  initialText,
  input,
  label,
  meta: { error, touched },
  module,
  options,
  required,
  ...rest
}) {
  const displayError = touched && !!error

  return (
    <Form.Field
      error={displayError}
      required={required}
      style={{ position: 'relative' }}
    >
      {label && <label htmlFor={input.name}>{label}</label>}
      {helpText && <p>{helpText}</p>}
      <Dropdown
        options={options}
        search
        selection
        selectOnNavigation={false}
        {...input}
        {...rest}
        text={input.value || initialText}
      />
      {displayError && (
        <FormFieldError
          error={error}
          module={module}
          scope={errorScope || input.name}
        />
      )}
    </Form.Field>
  )
}

DropdownSearch.propTypes = propTypes
DropdownSearch.defaultProps = defaultProps

export default DropdownSearch
