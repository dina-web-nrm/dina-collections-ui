import React from 'react'
import PropTypes from 'prop-types'
import { Icon } from 'semantic-ui-react'

const propTypes = {
  createNotification: PropTypes.func,
  helpNotification: PropTypes.shape({ type: PropTypes.string.isRequired }),
  helpText: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  htmlFor: PropTypes.string.isRequired,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
}
const defaultProps = {
  createNotification: undefined,
  helpNotification: undefined,
  helpText: undefined,
  label: undefined,
}
const FieldLabel = ({
  createNotification,
  label,
  htmlFor,
  helpNotification,
  helpText,
}) => {
  return (
    <label htmlFor={htmlFor}>
      {label}
      {
        // this ugly stuff is required since currently translations can only
        // be components
      }
      {helpText && ' ('}
      {helpText && helpText}
      {helpText && ')'}
      {helpNotification && ' '}
      {helpNotification && (
        <Icon
          color="blue"
          link
          name="help circle outline"
          onClick={() => createNotification(helpNotification)}
        />
      )}
    </label>
  )
}

FieldLabel.propTypes = propTypes
FieldLabel.defaultProps = defaultProps

export default FieldLabel
