/* eslint-disable import/no-extraneous-dependencies */
import React from 'react'
import { storiesOf } from '@storybook/react'
import 'semantic-ui/dist/semantic.css' // eslint-disable-line
import setupTestComponent from 'utilities/test/setupTestComponent'
import Footer from './Footer'

storiesOf('coreModules/commonUi/Footer', module).add('Default', () => {
  return setupTestComponent({
    component: <Footer />,
    mount: false,
  })
})
