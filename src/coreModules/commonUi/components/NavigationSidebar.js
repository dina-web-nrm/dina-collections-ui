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
  dispayHome: PropTypes.bool,
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
  nested: PropTypes.bool,
  width: PropTypes.number,
}

const defaultProps = {
  dispayHome: false,
  dispayLogout: true,
  navItems: [],
  nested: false,
  width: 100,
}

const SidebarNavItem = ({ navItem }) => {
  const { exact, icon, name, path, push, translate = true } = navItem
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
}

const SidebarNavItemGroup = ({ navGroupItem }) => {
  const {
    exact,
    icon,
    items,
    name,
    path,
    push,
    translate = true,
  } = navGroupItem
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
      <Menu.Menu>
        {items.map(navItem => {
          return <SidebarNavItem navItem={navItem} />
        })}
      </Menu.Menu>
    </NavLink>
  )
}

const NavigationSidebar = ({
  dispayHome,
  dispayLogout,
  nested,
  logout,
  navItems,
  width,
}) => {
  return (
    <Sidebar
      animation="overlay"
      as={Menu}
      borderless={nested}
      className="flex"
      icon={nested ? undefined : 'labeled'}
      inverted
      style={{ overflow: 'hidden', width }}
      vertical
      visible
    >
      {navItems.map(navItem => {
        if (navItem.items) {
          return <SidebarNavItemGroup navGroupItem={navItem} />
        }

        return <SidebarNavItem navItem={navItem} />
      })}
      {dispayHome && (
        <NavLink
          activeClassName="active"
          className="item push bottom"
          exact
          key="/"
          to="/"
        >
          <Icon name="reply" />
          <ModuleTranslate capitalize textKey="routes.home" />
        </NavLink>
      )}
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
