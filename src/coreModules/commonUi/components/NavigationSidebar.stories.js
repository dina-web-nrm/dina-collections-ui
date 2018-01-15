/* eslint-disable import/no-extraneous-dependencies */
import React from 'react'
import { storiesOf } from '@storybook/react'
import 'semantic-ui/dist/semantic.css' // eslint-disable-line
import setupStorybookComponent from 'utilities/test/setupStorybookComponent'
import NavigationSidebar from './NavigationSidebar'

const NAVIGATION_SIDEBAR_ITEMS = [
  {
    exact: true,
    icon: 'home',
    name: 'home',
    path: '/app',
  },
  {
    exact: true,
    icon: 'plus',
    name: 'registerMammal',
    path: '/app/mammals/register',
  },
  {
    exact: true,
    icon: 'search',
    name: 'lookupMammals',
    path: '/app/mammals/lookup',
  },
  {
    exact: true,
    icon: 'setting',
    name: 'settings',
    path: '/app/settings',
    push: true,
  },
]

storiesOf('coreModules/commonUi/NavigationSidebar', module).add(
  'Default',
  context => {
    return setupStorybookComponent({
      component: <NavigationSidebar navItems={NAVIGATION_SIDEBAR_ITEMS} />,
      context,
      wrap: false,
    })
  }
)
