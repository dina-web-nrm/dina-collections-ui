/* eslint-disable import/no-extraneous-dependencies */
import React from 'react'
import { storiesOf } from '@storybook/react'
import 'semantic-ui/dist/semantic.css' // eslint-disable-line
import setupStorybookComponent from 'utilities/test/setupStorybookComponent'
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
    return setupStorybookComponent({
      component: <Translate textKey="firstName" />,
      initialState,
    })
  })
  .add('No translation available', () => {
    return setupStorybookComponent({
      component: <Translate textKey="non-existing" />,
      initialState,
    })
  })
  .add('Fallback', () => {
    return setupStorybookComponent({
      component: (
        <Translate fallback="This is fallback" textKey="non-existing" />
      ),
      initialState,
    })
  })
  .add('Capitalize', () => {
    return setupStorybookComponent({
      component: <Translate capitalize textKey="lastName" />,
      initialState,
    })
  })
  .add('Multiple keys', () => {
    return setupStorybookComponent({
      component: <Translate capitalize textKeys={['dont-exist', 'lastName']} />,
      initialState,
    })
  })

  .add('Interpolation', () => {
    return setupStorybookComponent({
      component: (
        <Translate capitalize params={{ name: 'Anton' }} textKey="greet" />
      ),
      initialState,
    })
  })
