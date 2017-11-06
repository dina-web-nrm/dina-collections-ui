import React from 'react'
import PropTypes from 'prop-types'
import { Container } from 'semantic-ui-react'

const propTypes = {
  children: PropTypes.node.isRequired,
}

const PageTemplate = ({ children }) => {
  return (
    <Container style={{ height: '100vh', marginTop: 30, minHeight: '400' }}>
      {children}
    </Container>
  )
}

PageTemplate.propTypes = propTypes

export default PageTemplate
