import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Icon } from 'semantic-ui-react'

import createNotificationAC from '../actionCreators/createNotification'

const mapDispatchToProps = { createNotification: createNotificationAC }

const propTypes = {
  createNotification: PropTypes.func.isRequired,
  helpNotificationProps: PropTypes.shape({
    description: PropTypes.node,
    descriptionHeaderKey: PropTypes.string,
    descriptionKey: PropTypes.string,
    headerKey: PropTypes.string,
    linkTextKey: PropTypes.string,
    linkTo: PropTypes.string,
    size: PropTypes.string,
  }).isRequired,
}

export const FormFieldHelpIcon = ({
  createNotification,
  helpNotificationProps,
}) => {
  return (
    <Icon
      color="blue"
      link
      name="help circle outline"
      onClick={() =>
        createNotification({
          componentProps: helpNotificationProps,
          type: 'HELP_TEXT',
        })
      }
    />
  )
}

FormFieldHelpIcon.propTypes = propTypes

export default connect(undefined, mapDispatchToProps)(FormFieldHelpIcon)
