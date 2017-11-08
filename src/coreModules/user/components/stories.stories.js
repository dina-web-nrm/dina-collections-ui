/* eslint-disable import/no-extraneous-dependencies */
import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { Provider } from 'react-redux'
import 'semantic-ui/dist/semantic.css' // eslint-disable-line
import createTestStore from 'utilities/test/createTestStore'
import I18nProvider from 'coreModules/i18n/components/I18nProvider'
import { LoginForm } from './LoginForm'

storiesOf('coreModules/user/LoginForm', module).add('Default', () => {
  const store = createTestStore()
  return (
    <Provider store={store}>
      <I18nProvider>
        <LoginForm login={action('login')} />
      </I18nProvider>
    </Provider>
  )
})
