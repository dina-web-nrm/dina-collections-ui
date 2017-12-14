import React from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { NavLink, withRouter } from 'react-router-dom'
import { Sidebar, Icon, Menu } from 'semantic-ui-react'
import logoutActionCreator from 'coreModules/user/actionCreators/logout'
import { createModuleTranslate } from 'coreModules/i18n/components'

const ModuleTranslate = createModuleTranslate('commonUi')

const mapDispatchToProps = {
  logout: logoutActionCreator,
}

const propTypes = {
  dispayLogout: PropTypes.bool,
  logout: PropTypes.func.isRequired,
  navItems: PropTypes.arrayOf(
    PropTypes.shape({
      exact: PropTypes.bool.isRequired,
      icon: PropTypes.string,
      name: PropTypes.string.isRequired,
      path: PropTypes.string.isRequired,
      push: PropTypes.bool,
    })
  ),
}

const defaultProps = {
  dispayLogout: true,
  navItems: [],
}

const NavigationSidebar = ({ dispayLogout, logout, navItems }) => {
  return (
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
      {navItems.map(({ exact, icon, name, path, push, translate = true }) => {
        return (
          <NavLink
            activeClassName="active"
            className={push ? 'item push bottom' : 'item'}
            exact={exact}
            key={path}
            to={path}
          >
            {icon && <Icon name={icon} size="large" />}
            {translate ? (
              <ModuleTranslate capitalize textKey={`routes.${name}`} />
            ) : (
              name
            )}
          </NavLink>
        )
      })}
      {dispayLogout && (
        <Menu.Item
          onClick={event => {
            event.preventDefault()
            logout()
          }}
        >
          <Icon name="sign out" />
          <ModuleTranslate capitalize textKey="Navbar.logout" />
        </Menu.Item>
      )}
    </Sidebar>
  )
}

NavigationSidebar.propTypes = propTypes
NavigationSidebar.defaultProps = defaultProps

export default compose(withRouter, connect(undefined, mapDispatchToProps))(
  NavigationSidebar
)
