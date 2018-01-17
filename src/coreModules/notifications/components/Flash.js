import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Message } from 'semantic-ui-react'

import { withI18n } from 'coreModules/i18n/higherOrderComponents'
import { clearTimeout } from 'timers'

const propTypes = {
  descriptionKey: PropTypes.string,
  headerKey: PropTypes.string,
  i18n: PropTypes.shape({
    translate: PropTypes.func.isRequired,
  }).isRequired,
  removeNotification: PropTypes.func.isRequired,
  sequentialId: PropTypes.number.isRequired,
  style: PropTypes.oneOf(['error', 'info', 'success', 'warning']),
  ttl: PropTypes.number,
}
const defaultProps = {
  descriptionKey: undefined,
  headerKey: undefined,
  style: 'info',
  ttl: undefined,
}

class Flash extends Component {
  componentDidMount() {
    const { removeNotification, sequentialId, ttl } = this.props

    if (ttl) {
      this.ttlTimeout = setTimeout(
        () => removeNotification({ sequentialId }),
        ttl
      )
    }
  }

  componentWillUnmount() {
    if (this.ttlTimeout) {
      clearTimeout(this.ttlTimeout)
    }
  }

  render() {
    const {
      descriptionKey,
      headerKey,
      removeNotification,
      sequentialId,
      i18n: { translate },
      style,
    } = this.props

    return (
      <Message
        className="flash"
        content={descriptionKey && translate({ textKey: descriptionKey })}
        error={style === 'error'}
        header={headerKey && translate({ textKey: headerKey })}
        info={style === 'info'}
        onClick={() => removeNotification({ sequentialId })}
        onDismiss={() => removeNotification({ sequentialId })}
        success={style === 'success'}
        warning={style === 'warning'}
      />
    )
  }
}

Flash.propTypes = propTypes
Flash.defaultProps = defaultProps

export default withI18n()(Flash)
