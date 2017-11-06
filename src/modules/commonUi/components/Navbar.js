import React from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { NavLink, withRouter } from 'react-router-dom'
import { Button, Container, Icon, Menu } from 'semantic-ui-react'
import userLocalSelectors from 'modules/user/globalSelectors'
import sizeLocalSelectors from 'modules/size/globalSelectors'
import logoutActionCreator from 'modules/user/actionCreators/logout'
import { createModuleTranslate, LanguageSelect } from 'modules/i18n/components'

const ModuleTranslate = createModuleTranslate('commonUi')

const mapStateToProps = state => {
  return {
    isLoggedIn: userLocalSelectors.getUserLoggedIn(state),
    size: sizeLocalSelectors.getSize(state),
    userName: userLocalSelectors.getUserName(state),
  }
}

const mapDispatchToProps = {
  logout: logoutActionCreator,
}

const propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  logout: PropTypes.func.isRequired,
  navItems: PropTypes.arrayOf(
    PropTypes.shape({
      exact: PropTypes.bool.isRequired,
      icon: PropTypes.string,
      name: PropTypes.string.isRequired,
      path: PropTypes.string.isRequired,
      requireLoggedInUser: PropTypes.bool,
      requireLoggedOutUser: PropTypes.bool,
    })
  ),
  size: PropTypes.string.isRequired,
  userName: PropTypes.string,
}

const defaultProps = {
  navItems: [],
  userName: '',
}

const CustomNavbar = ({ isLoggedIn, logout, navItems, size, userName }) => {
  return !isLoggedIn ? null : (
    <Menu size="large">
      <Container>
        {navItems
          .map(
            ({
              exact,
              icon,
              name,
              path,
              requireLoggedInUser,
              requireLoggedOutUser,
            }) => {
              if (requireLoggedInUser && !isLoggedIn) {
                return null
              }

              if (requireLoggedOutUser && isLoggedIn) {
                return null
              }

              return (
                <NavLink
                  activeClassName="active"
                  className="item"
                  exact={exact}
                  key={path}
                  to={path}
                >
                  {icon && <Icon name={icon} size="large" />}
                  <ModuleTranslate capitalize textKey={`routes.${name}`} />
                </NavLink>
              )
            }
          )
          .filter(component => !!component)}

        {isLoggedIn && (
          <Menu.Menu position="right">
            <Menu.Item>
              <p>{userName}</p>
            </Menu.Item>
            <Menu.Item>
              <p>{size}</p>
            </Menu.Item>
            <Menu.Item>
              <Button
                as="button"
                onClick={event => {
                  event.preventDefault()
                  logout()
                }}
              >
                <ModuleTranslate capitalize textKey="Navbar.logout" />
              </Button>
            </Menu.Item>
            <Menu.Item>
              <LanguageSelect />
            </Menu.Item>
          </Menu.Menu>
        )}
      </Container>
    </Menu>
  )
}

CustomNavbar.propTypes = propTypes
CustomNavbar.defaultProps = defaultProps

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(CustomNavbar)
