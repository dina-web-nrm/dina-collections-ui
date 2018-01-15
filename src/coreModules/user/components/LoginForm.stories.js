/* eslint-disable import/no-extraneous-dependencies */
import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import 'semantic-ui/dist/semantic.css' // eslint-disable-line
import setupStorybookComponent from 'utilities/test/setupStorybookComponent'
import { LoginForm } from './LoginForm'

storiesOf('coreModules/user/LoginForm', module).add('Default', context => {
  return setupStorybookComponent({
    component: <LoginForm login={action('login')} />,
    context,
  })
})
