import React from 'react'
import PropTypes from 'prop-types'
import ModuleTranslate from './ModuleTranslate'

const propTypes = {
  textKey: PropTypes.string.isRequired,
}

export default function createModuleTranslate(moduleName) {
  const ModuleTranslateWrapper = ({ ...rest }) => {
    return <ModuleTranslate {...rest} module={moduleName} />
  }
  ModuleTranslateWrapper.propTypes = propTypes
  return ModuleTranslateWrapper
}
