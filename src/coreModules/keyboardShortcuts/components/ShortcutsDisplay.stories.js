/* eslint-disable import/no-extraneous-dependencies */
import React from 'react'
import { storiesOf } from '@storybook/react'
import 'semantic-ui/dist/semantic.css' // eslint-disable-line
import setupTestComponent from 'utilities/test/setupTestComponent'
import ShortcutsDisplay from './ShortcutsDisplay'
import setShortcutsModalVisible from '../actionCreators/setShortcutsModalVisible'

storiesOf('coreModules/keyboardShortcits/ShortcutsDisplay', module).add(
  'No fixed menu',
  () => {
    const { store, rootComponent: mountedComponent } = setupTestComponent({
      component: (
        <ShortcutsDisplay
          open={process.env.NODE_ENV !== 'test'} // open modal does not work when running tests
          showShortcutInfo
        />
      ),
      fullExport: true,
      mount: false,
    })

    store.dispatch(setShortcutsModalVisible())

    return mountedComponent
  }
)
