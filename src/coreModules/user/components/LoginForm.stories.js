/* eslint-disable import/no-extraneous-dependencies */
import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import 'semantic-ui/dist/semantic.css' // eslint-disable-line
import setupTestComponent from 'utilities/test/setupTestComponent'
import { LoginForm } from './LoginForm'

storiesOf('coreModules/user/LoginForm', module).add('Default', () => {
  return setupTestComponent({
    component: <LoginForm login={action('login')} />,
    mount: false,
  })
})
