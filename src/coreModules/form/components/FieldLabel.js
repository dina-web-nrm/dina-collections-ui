import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Icon } from 'semantic-ui-react'

import createNotificationAC from 'coreModules/notifications/actionCreators/createNotification'

const mapDispatchToProps = { createNotification: createNotificationAC }

const propTypes = {
  createNotification: PropTypes.func.isRequired,
  helpNotification: PropTypes.shape({ type: PropTypes.string.isRequired }),
  helpText: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  htmlFor: PropTypes.string.isRequired,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
}
const defaultProps = {
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

export default connect(undefined, mapDispatchToProps)(FieldLabel)
