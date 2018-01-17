import React from 'react'
import PropTypes from 'prop-types'

import { capitalizeFirstLetter, getTranslationByPath } from '../utilities'

const contextTypes = {
  language: PropTypes.string.isRequired,
  translations: PropTypes.object.isRequired,
}
const propTypes = {
  capitalize: PropTypes.bool,
  fallback: PropTypes.string,
  params: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  textKey: PropTypes.string,
  textKeys: PropTypes.arrayOf(PropTypes.string),
}
const defaultProps = {
  capitalize: false,
  fallback: undefined,
  params: null,
  textKey: '',
  textKeys: [],
}

const Translate = (
  { capitalize, fallback, params, textKey, textKeys },
  { language, translations }
) => {
  const translation = getTranslationByPath(translations, {
    language,
    params,
    textKey,
    textKeys,
  })

  const output =
    capitalize && translation ? capitalizeFirstLetter(translation) : translation
  if (!output) {
    console.warn(`Translation not found for path: ${textKey}`, translations) // eslint-disable-line no-console
  }

  if (
    fallback &&
    (output === textKey ||
      (output && textKeys && textKeys[0] && output.indexOf(textKeys[0]) > -1)) // enough to check the first textKey
  ) {
    return <span>{fallback}</span>
  }

  return <span>{output || textKey}</span>
}

Translate.contextTypes = contextTypes
Translate.propTypes = propTypes
Translate.defaultProps = defaultProps

export default Translate
