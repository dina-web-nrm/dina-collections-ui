import React from 'react'
import PropTypes from 'prop-types'
import { Container } from 'semantic-ui-react'

const propTypes = {
  children: PropTypes.node.isRequired,
}

const PageTemplate = ({ children }) => {
  return (
    <Container
      style={{ minHeight: '100vh', paddingBottom: 30, paddingTop: 61.5 }}
    >
      {children}
    </Container>
  )
}

PageTemplate.propTypes = propTypes

export default PageTemplate
