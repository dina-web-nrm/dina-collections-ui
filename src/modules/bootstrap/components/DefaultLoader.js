import React from 'react'
import PropTypes from 'prop-types'

const propTypes = {
  loading: PropTypes.bool.isRequired,
}
const DefaultLoader = ({ loading }) => {
  const style = {
    backgroundColor: '#E4E9EC',
    height: '100%',
    left: 0,
    opacity: loading ? 1 : 0,
    pointerEvents: 'none',
    position: 'absolute',
    right: 0,
    top: 0,
    transition: 'opacity 0.3s',
    width: '100%',
    zIndex: 1000,
  }
  return <div style={style} />
}

DefaultLoader.propTypes = propTypes

export default DefaultLoader
