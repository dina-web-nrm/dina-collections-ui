import React from 'react'
import PropTypes from 'prop-types'
import { Message, Label } from 'semantic-ui-react'
import { ModuleTranslate } from 'coreModules/i18n/components'

const propTypes = {
  errors: PropTypes.array.isRequired,
  scope: PropTypes.string,
}

const defaultProps = {
  scope: 'schemaErrors',
}

const FormSchemaError = ({ errors, scope }) => {
  return (
    <Message negative>
      <Label.Group color="red" size="tiny">
        {errors.map((error, index) => {
          return (
            <Label key={index}>
              <ModuleTranslate
                capitalize
                module="error"
                params={error.params}
                scope={scope}
                textKey={error.errorCode}
              />
            </Label>
          )
        })}
      </Label.Group>
    </Message>
  )
}

FormSchemaError.propTypes = propTypes
FormSchemaError.defaultProps = defaultProps

export default FormSchemaError
