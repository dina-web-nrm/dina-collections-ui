/* eslint-disable react/prop-types */
import React from 'react'
import { Form, Input } from 'semantic-ui-react'
import { FormFieldError } from '../../error/components'

const Field = ({
  icon,
  module,
  input,
  meta: { touched, error },
  type,
  errorScope,
  ...rest
}) => {
  const displayError = touched && !!error
  return (
    <Form.Field error={displayError} style={{ position: 'relative' }}>
      <Input icon={icon} iconPosition="left" type={type} {...input} {...rest} />
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

export default Field
