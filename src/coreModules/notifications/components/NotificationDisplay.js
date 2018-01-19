import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'

import { removeNotification } from '../actionCreators'
import globalSelectors from '../globalSelectors'

const mapStateToProps = (state, { displayType }) => {
  return {
    activeNotification: globalSelectors.getPrioritizedActiveNotificationByDisplayType(
      state,
      displayType
    ),
  }
}
const mapDispatchToProps = { removeNotification }

const propTypes = {
  activeNotification: PropTypes.shape({
    component: PropTypes.func.isRequired,
    componentProps: PropTypes.object,
    sequentialId: PropTypes.number.isRequired,
  }),
  removeNotification: PropTypes.func.isRequired,
}
const defaultProps = {
  activeNotification: undefined,
}

export class NotificationDisplay extends Component {
  render() {
    const { activeNotification } = this.props

    if (activeNotification) {
      const {
        component: NotificationComponent,
        componentProps,
        sequentialId,
        ttl,
      } = activeNotification

      return (
        <NotificationComponent
          {...componentProps}
          removeNotification={this.props.removeNotification}
          sequentialId={sequentialId}
          ttl={ttl}
        />
      )
    }

    return null
  }
}

NotificationDisplay.propTypes = propTypes
NotificationDisplay.defaultProps = defaultProps

export default compose(connect(mapStateToProps, mapDispatchToProps))(
  NotificationDisplay
)
