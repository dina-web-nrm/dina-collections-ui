import React from 'react'
import PropTypes from 'prop-types'

import { getTranslationByPath } from '../utilities'

const contextTypes = {
  language: PropTypes.string.isRequired,
  markdown: PropTypes.object.isRequired,
}

const propTypes = {
  textKey: PropTypes.string,
  textKeys: PropTypes.arrayOf(PropTypes.string),
}
const defaultProps = {
  textKey: '',
  textKeys: [],
}

const Markdown = ({ textKey, textKeys }, { language, markdown }) => {
  const output = getTranslationByPath(markdown, {
    language,
    textKey,
    textKeys,
  })

  if (!output) {
    console.warn(`Translation not found for path: ${textKey}`, markdown) // eslint-disable-line no-console
  }

  return <div dangerouslySetInnerHTML={{ __html: output }} /> // eslint-disable-line react/no-danger
}

Markdown.contextTypes = contextTypes
Markdown.propTypes = propTypes
Markdown.defaultProps = defaultProps

export default Markdown
