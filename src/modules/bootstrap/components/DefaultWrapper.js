import React from 'react'
import PropTypes from 'prop-types'

const propTypes = {
  children: PropTypes.any.isRequired,
}
const DefaultWrapper = ({ children }) => {
  return <div style={{ height: '100vh' }}>{children}</div>
}

DefaultWrapper.propTypes = propTypes

export default DefaultWrapper
