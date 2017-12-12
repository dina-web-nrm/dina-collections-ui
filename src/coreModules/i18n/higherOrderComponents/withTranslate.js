import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { capitalizeFirstLetter, getTranslationByPath } from '../utilities'

export default function withTranslate(ComposedComponent) {
  const contextTypes = {
    language: PropTypes.string.isRequired,
    translations: PropTypes.object.isRequired,
  }

  class WithTranslate extends Component {
    constructor(props) {
      super(props)
      this.translate = this.translate.bind(this)
    }

    translate({ capitalize, fallback, params, textKey, textKeys }) {
      const { language, translations } = this.context
      const translation = getTranslationByPath(translations, {
        language,
        params,
        textKey,
        textKeys,
      })

      const output =
        capitalize && translation
          ? capitalizeFirstLetter(translation)
          : translation
      if (!output) {
        console.warn(`Translation not found for path: ${textKey}`, translations) // eslint-disable-line no-console
      }

      if (fallback && output === textKey) {
        return fallback
      }

      return output || textKey
    }

    render() {
      return <ComposedComponent translate={this.translate} {...this.props} />
    }
  }

  WithTranslate.contextTypes = contextTypes

  return WithTranslate
}
