/* eslint-disable import/no-extraneous-dependencies */
import React from 'react'
import { storiesOf } from '@storybook/react'
import 'semantic-ui/dist/semantic.css' // eslint-disable-line
import setupStorybookComponent from 'utilities/test/setupStorybookComponent'
import ShortcutsDisplay from './ShortcutsDisplay'
import setShortcutsModalVisible from '../actionCreators/setShortcutsModalVisible'

storiesOf('coreModules/keyboardShortcuts/ShortcutsDisplay', module).add(
  'No fixed menu',
  context => {
    const { store, rootComponent: mountedComponent } = setupStorybookComponent({
      component: (
        <ShortcutsDisplay
          open={process.env.NODE_ENV !== 'test'} // open modal does not work when running tests
          showShortcutInfo
        />
      ),
      context,
      fullExport: true,
    })

    store.dispatch(setShortcutsModalVisible())

    return mountedComponent
  }
)
