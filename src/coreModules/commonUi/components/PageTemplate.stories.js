/* eslint-disable import/no-extraneous-dependencies */
import React from 'react'
import { storiesOf } from '@storybook/react'
import 'semantic-ui/dist/semantic.css' // eslint-disable-line
import setupTestComponent from 'utilities/test/setupTestComponent'
import PageTemplate from './PageTemplate'

storiesOf('coreModules/commonUi/PageTemplate', module)
  .add('No fixed menu', () => {
    return setupTestComponent({
      component: (
        <PageTemplate hasFixedMenu={false}>
          <div>Page content</div>
        </PageTemplate>
      ),
      mount: false,
    })
  })
  .add('Fixed menu', () => {
    return setupTestComponent({
      component: (
        <PageTemplate hasFixedMenu>
          <div>Page content</div>
        </PageTemplate>
      ),
      mount: false,
    })
  })
