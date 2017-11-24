import React from 'react'
import PropTypes from 'prop-types'
import { Form, Input } from 'semantic-ui-react'
import { FormFieldError } from '../../error/components'

const propTypes = {
  errorScope: PropTypes.string,
  helpText: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  icon: PropTypes.string,
  iconPosition: PropTypes.string,
  input: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  meta: PropTypes.shape({
    error: PropTypes.object,
    touched: PropTypes.bool.isRequired,
  }).isRequired,
  module: PropTypes.string.isRequired,
  required: PropTypes.bool,
  type: PropTypes.string.isRequired,
}
const defaultProps = {
  errorScope: undefined,
  helpText: undefined,
  icon: undefined,
  iconPosition: 'left',
  label: undefined,
  required: false,
}

const Field = ({
  errorScope,
  label,
  icon,
  iconPosition,
  input,
  meta: { touched, error },
  module,
  required,
  helpText,
  type,
  ...rest
}) => {
  const displayError = touched && !!error
  return (
    <Form.Field
      error={displayError}
      required={required}
      style={{ position: 'relative' }}
    >
      {label && (
        <label htmlFor={input.name}>
          {label}
          {
            // this ugly stuff is required since currently translations can only
            // be components
          }
          {helpText && ' ('}
          {helpText && helpText}
          {helpText && ')'}
        </label>
      )}
      <Input
        icon={icon}
        iconPosition={icon && iconPosition}
        type={type}
        {...input}
        {...rest}
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

Field.propTypes = propTypes
Field.defaultProps = defaultProps

export default Field
