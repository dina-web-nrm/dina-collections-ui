/* eslint-disable import/no-extraneous-dependencies */
import React from 'react'
import { storiesOf } from '@storybook/react'
import 'semantic-ui/dist/semantic.css' // eslint-disable-line
import setupTestComponent from 'utilities/test/setupTestComponent'
import Translate from './Translate'

const initialState = {
  i18n: {
    availableLanguages: ['en', 'sv'],
    defaultLanguage: 'sv',
    language: 'sv',
    translations: {
      firstName: {
        en: 'first name',
        sv: 'förnamn',
      },
      greet: {
        en: 'hello {{name}}', // eslint-disable-line no-template-curly-in-string
        sv: 'hej {{name}}', // eslint-disable-line no-template-curly-in-string
      },
      lastName: {
        en: 'lastname',
        sv: 'efternamn',
      },
    },
  },
}

storiesOf('coreModules/i18n/Translate', module)
  .add('Default', () => {
    return setupTestComponent({
      component: <Translate textKey="firstName" />,
      initialState,
      mount: false,
    })
  })
  .add('No translation available', () => {
    return setupTestComponent({
      component: <Translate textKey="non-existing" />,
      initialState,
      mount: false,
    })
  })
  .add('Fallback', () => {
    return setupTestComponent({
      component: (
        <Translate fallback="This is fallback" textKey="non-existing" />
      ),
      initialState,
      mount: false,
    })
  })
  .add('Capitalize', () => {
    return setupTestComponent({
      component: <Translate capitalize textKey="lastName" />,
      initialState,
      mount: false,
    })
  })
  .add('Multiple keys', () => {
    return setupTestComponent({
      component: <Translate capitalize textKeys={['dont-exist', 'lastName']} />,
      initialState,
      mount: false,
    })
  })

  .add('Interpolation', () => {
    return setupTestComponent({
      component: (
        <Translate capitalize params={{ name: 'Anton' }} textKey="greet" />
      ),
      initialState,
      mount: false,
    })
  })
