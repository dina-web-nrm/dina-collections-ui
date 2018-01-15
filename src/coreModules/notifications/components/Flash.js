import React from 'react'
import PropTypes from 'prop-types'
import { Message } from 'semantic-ui-react'

import { withI18n } from 'coreModules/i18n/higherOrderComponents'

const propTypes = {
  descriptionKey: PropTypes.string,
  headerKey: PropTypes.string,
  i18n: PropTypes.shape({
    translate: PropTypes.func.isRequired,
  }).isRequired,
  removeNotification: PropTypes.func.isRequired,
  sequentialId: PropTypes.number.isRequired,
  ttl: PropTypes.number,
}
const defaultProps = {
  descriptionKey: undefined,
  headerKey: undefined,
  ttl: undefined,
}

const Flash = ({
  descriptionKey,
  headerKey,
  removeNotification,
  sequentialId,
  i18n: { translate },
  ttl,
}) => {
  if (ttl) {
    setTimeout(() => removeNotification({ sequentialId }), ttl)
  }

  return (
    <Message
      className="flash"
      content={descriptionKey && translate({ textKey: descriptionKey })}
      header={headerKey && translate({ textKey: headerKey })}
      onClick={() => removeNotification({ sequentialId })}
      onDismiss={() => removeNotification({ sequentialId })}
    />
  )
}

Flash.propTypes = propTypes
Flash.defaultProps = defaultProps

export default withI18n()(Flash)
