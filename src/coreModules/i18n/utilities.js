import { createGetter } from '../../utilities/stateHelper'

const interpolationRegex = /\{\{([a-zA-Z0-9_-]+)}}/g

export const format = (string, params = {}) => {
  let resultString = string
  const stringParameters = resultString.match(interpolationRegex)
  if (!stringParameters) {
    return string
  }
  stringParameters.forEach(stringParameter => {
    const cleanParameter = stringParameter.replace(/[{}]/g, '')
    if (params[cleanParameter] !== undefined) {
      resultString = resultString.replace(
        `${stringParameter}`,
        params[cleanParameter].toString()
      )
    }
  })
  return resultString
}

export const translationByPathGetter = createGetter([':textKey', ':language'])

export const getTranslationByPath = (
  translations,
  { textKey: inputTextKey, textKeys: inputTextKeys, language, params }
) => {
  const textKeys = (inputTextKeys && inputTextKeys.length && inputTextKeys) || [
    inputTextKey,
  ]
  const translation =
    textKeys.reduce((foundTranslation, textKey) => {
      if (foundTranslation) {
        return foundTranslation
      }
      return translationByPathGetter(translations, {
        language,
        textKey,
      })
    }, '') || textKeys.join(', ')

  return params && translation ? format(translation, params) : translation
}

export const capitalizeFirstLetter = string => {
  return string.charAt(0).toUpperCase() + string.slice(1)
}
