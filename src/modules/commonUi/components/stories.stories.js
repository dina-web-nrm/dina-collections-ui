/* eslint-disable import/no-extraneous-dependencies */
import React from 'react'
import { Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import { storiesOf } from '@storybook/react'
import { withKnobs, text } from '@storybook/addon-knobs'
import withReadme from 'storybook-readme/with-readme'
import 'semantic-ui/dist/semantic.css' // eslint-disable-line
import createTestStore from 'utilities/test/createTestStore'
import defaultTestConfig from 'utilities/test/defaultTestConfig'
import I18nProvider from 'modules/i18n/components/I18nProvider'
import readme from '../sample.md'
import Navbar from './Navbar'

const stories = storiesOf('modules/commonUi/Navbar', module)

const config = defaultTestConfig()
stories.addDecorator(withKnobs)
stories.add(
  'Default state',
  withReadme(readme, () => {
    const testLink = text('Test link', 'Test')

    const store = createTestStore({
      config,
      initialState: {
        user: {
          user: {
            username: 'John Doe',
          },
        },
      },
    })

    return (
      <Provider store={store}>
        <I18nProvider>
          <Router history={config.routing}>
            <Navbar testLink={testLink} />
          </Router>
        </I18nProvider>
      </Provider>
    )
  })
)
