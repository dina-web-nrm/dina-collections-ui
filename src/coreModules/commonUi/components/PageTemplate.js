import React from 'react'
import PropTypes from 'prop-types'
import { Container } from 'semantic-ui-react'

const propTypes = {
  children: PropTypes.node.isRequired,
}

const PageTemplate = ({ children }) => {
  return (
    <Container style={{ marginBottom: 30, marginTop: 30, minHeight: '100vh' }}>
      {children}
    </Container>
  )
}

PageTemplate.propTypes = propTypes

export default PageTemplate
