import React from 'react'
import PropTypes from 'prop-types'

import { createModuleTranslate } from 'coreModules/i18n/components'

const ModuleTranslate = createModuleTranslate('form')

const propTypes = {
  content: PropTypes.shape({
    scope: PropTypes.string,
    textKey: PropTypes.string,
    value: PropTypes.number.isRequired,
  }).isRequired,
}

function TranslateSearchResult({ content: { scope, textKey, value } }) {
  return textKey ? (
    <ModuleTranslate scope={scope} textKey={textKey} />
  ) : (
    <div>{value}</div>
  )
}

TranslateSearchResult.propTypes = propTypes

export default TranslateSearchResult
