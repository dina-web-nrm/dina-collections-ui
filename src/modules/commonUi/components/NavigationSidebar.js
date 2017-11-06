import React from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { NavLink, withRouter } from 'react-router-dom'
import { Sidebar, Icon, Menu } from 'semantic-ui-react'
import userLocalSelectors from 'modules/user/globalSelectors'
import logoutActionCreator from 'modules/user/actionCreators/logout'
import { createModuleTranslate } from 'modules/i18n/components'

const ModuleTranslate = createModuleTranslate('commonUi')

const mapStateToProps = state => {
  return {
    isLoggedIn: userLocalSelectors.getUserLoggedIn(state),
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
      push: PropTypes.bool,
      requireLoggedInUser: PropTypes.bool,
      requireLoggedOutUser: PropTypes.bool,
    })
  ),
}

const defaultProps = {
  navItems: [],
  testLink: '',
}

const NavigationSidebar = ({ isLoggedIn, logout, navItems }) => {
  return !isLoggedIn ? null : (
    <Sidebar
      animation="overlay"
      as={Menu}
      className="flex"
      icon="labeled"
      inverted
      vertical
      visible
      width="thin"
    >
      {navItems
        .map(
          ({
            exact,
            icon,
            name,
            path,
            requireLoggedInUser,
            requireLoggedOutUser,
            push,
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
                className={push ? 'item push bottom' : 'item'}
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

      <Menu.Item
        onClick={event => {
          event.preventDefault()
          logout()
        }}
      >
        <Icon name="sign out" />
        <ModuleTranslate capitalize textKey="Navbar.logout" />
      </Menu.Item>
    </Sidebar>
  )
}

NavigationSidebar.propTypes = propTypes
NavigationSidebar.defaultProps = defaultProps

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(NavigationSidebar)
