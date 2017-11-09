import React from 'react'
import PropTypes from 'prop-types'
import Translate from './Translate'

const propTypes = {
  module: PropTypes.string,
  modules: PropTypes.arrayOf(PropTypes.string),
  scope: PropTypes.string,
  textKey: PropTypes.string.isRequired,
}

const defaultProps = {
  module: '',
  modules: [],
  scope: '',
}

export const buildModuleTextKey = ({ module, scope, textKey }) => {
  if (!scope) {
    return `modules.${module}.${textKey}`
  }
  return `modules.${module}.${scope}.${textKey}`
}

export const buildTextKeys = ({ modules, scope, textKey }) => {
  return modules.reduce((textKeys, module) => {
    if (scope) {
      textKeys.push(
        buildModuleTextKey({
          module,
          scope,
          textKey,
        })
      )
    }
    textKeys.push(
      buildModuleTextKey({
        module,
        textKey,
      })
    )
    return textKeys
  }, [])
}

const ModuleTranslate = ({
  module: moduleInput,
  modules: modulesInput,
  textKey,
  scope,
  ...rest
}) => {
  const modules =
    modulesInput && modulesInput.length ? modulesInput : [moduleInput]
  const textKeys = buildTextKeys({ modules, scope, textKey })
  return <Translate textKeys={textKeys} {...rest} />
}

ModuleTranslate.propTypes = propTypes
ModuleTranslate.defaultProps = defaultProps

export default ModuleTranslate
