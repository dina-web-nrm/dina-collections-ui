import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Dimmer, Icon, Menu } from 'semantic-ui-react'
import sizeSelectors from 'coreModules/size/globalSelectors'
import toggleSidebarAC from '../actionCreators/toggleSidebar'
import commonUiSelectors from '../globalSelectors'

const mapStateToProps = state => {
  return {
    isLarge: sizeSelectors.getIsLarge(state),
    sidebarIsOpen: commonUiSelectors.getSidebarIsOpen(state),
  }
}

const mapDispatchToProps = {
  toggleSidebar: toggleSidebarAC,
}

const propTypes = {
  children: PropTypes.node.isRequired,
  isLarge: PropTypes.bool.isRequired,
  loggedInView: PropTypes.bool,
  sidebarIsOpen: PropTypes.bool.isRequired,
  sidebarWidth: PropTypes.number,
  toggleSidebar: PropTypes.func.isRequired,
}

const defaultProps = {
  loggedInView: false,
  sidebarWidth: 100,
}

export const getViewWrapStyle = ({
  sidebarAlwaysVisible,
  sidebarIsOpen,
  sidebarToggable,
  sidebarWidth,
}) => {
  const viewWrapBaseStyle = {
    bottom: '100%',
    left: 0,
    minHeight: '100%',
    minWidth: '100%',
    position: 'relative',
    top: 0,
    transition: 'transform 0.2s',
    zIndex: 200,
  }

  const sizeBaseStyle = sidebarToggable
    ? {
        transform: sidebarIsOpen ? `translate(${sidebarWidth}px, 0px)` : '',
        WebkitTransform: sidebarIsOpen
          ? `translate(${sidebarWidth}px, 0px)`
          : '',

        zIndex: 200,
      }
    : {
        paddingLeft: sidebarAlwaysVisible ? sidebarWidth : 0,
        zIndex: 1,
      }

  return {
    ...viewWrapBaseStyle,
    ...sizeBaseStyle,
  }
}

const ViewWrap = ({
  children,
  isLarge,
  loggedInView,
  sidebarIsOpen,
  sidebarWidth,
  toggleSidebar,
}) => {
  const sidebarAlwaysVisible = isLarge && loggedInView
  const sidebarToggable = !isLarge && loggedInView

  const viewWrapStyle = getViewWrapStyle({
    sidebarAlwaysVisible,
    sidebarIsOpen,
    sidebarToggable,
    sidebarWidth,
  })
  const dimmerActive = sidebarToggable && sidebarIsOpen
  return (
    <div style={viewWrapStyle}>
      <Dimmer.Dimmable dimmed={dimmerActive}>
        {sidebarToggable && (
          <Menu inverted style={{ margin: 0 }}>
            <Menu.Item onClick={toggleSidebar}>
              <Icon name="sidebar" size="large" />
            </Menu.Item>
          </Menu>
        )}
        <Dimmer active={dimmerActive} onClickOutside={toggleSidebar} />
        <div
          className="ui fluid"
          style={{ backgroundColor: '#E4E9EC', overflow: 'hidden' }}
        >
          {children}
        </div>
      </Dimmer.Dimmable>
    </div>
  )
}

ViewWrap.propTypes = propTypes
ViewWrap.defaultProps = defaultProps

export default connect(mapStateToProps, mapDispatchToProps)(ViewWrap)
