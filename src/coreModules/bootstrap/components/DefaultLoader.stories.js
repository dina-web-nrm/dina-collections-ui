/* eslint-disable import/no-extraneous-dependencies */
import React from 'react'
import { storiesOf } from '@storybook/react'
import 'semantic-ui/dist/semantic.css' // eslint-disable-line
import setupTestComponent from 'utilities/test/setupTestComponent'
import { Segment } from 'semantic-ui-react'

import DefaultLoader from './DefaultLoader'

storiesOf('coreModules/bootstrap/DefaultLoader', module)
  .add('Not loading', () => {
    return setupTestComponent({
      component: (
        <div>
          <Segment>Some loaded content </Segment>
          <DefaultLoader loading={false} />{' '}
        </div>
      ),
      mount: false,
    })
  })
  .add('Loading', () => {
    return setupTestComponent({
      component: (
        <div>
          <Segment>Some not loaded content </Segment>
          <DefaultLoader loading />{' '}
        </div>
      ),
      mount: false,
    })
  })
