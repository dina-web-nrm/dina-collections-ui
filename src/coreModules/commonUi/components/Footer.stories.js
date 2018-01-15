/* eslint-disable import/no-extraneous-dependencies */
import React from 'react'
import { storiesOf } from '@storybook/react'
import 'semantic-ui/dist/semantic.css' // eslint-disable-line
import setupStorybookComponent from 'utilities/test/setupStorybookComponent'
import Footer from './Footer'

storiesOf('coreModules/commonUi/Footer', module).add('Default', context => {
  return setupStorybookComponent({
    component: <Footer />,
    context,
    wrap: false,
  })
})
