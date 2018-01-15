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
  .add('Default', context => {
    return setupStorybookComponent({
      component: <Translate textKey="firstName" />,
      context,
      initialState,
      title: 'Translate',
    })
  })
  .add('No translation available', context => {
    return setupStorybookComponent({
      component: <Translate textKey="non-existing" />,
      context,
      initialState,
      title: 'Translate',
    })
  })
  .add('Fallback', context => {
    return setupStorybookComponent({
      component: (
        <Translate fallback="This is fallback" textKey="non-existing" />
      ),
      context,
      initialState,
      title: 'Translate',
    })
  })
  .add('Capitalize', context => {
    return setupStorybookComponent({
      component: <Translate capitalize textKey="lastName" />,
      context,
      initialState,
      title: 'Translate',
    })
  })
  .add('Multiple keys', context => {
    return setupStorybookComponent({
      component: <Translate capitalize textKeys={['dont-exist', 'lastName']} />,
      context,
      initialState,
    })
  })

  .add('Interpolation', context => {
    return setupStorybookComponent({
      component: (
        <Translate capitalize params={{ name: 'Anton' }} textKey="greet" />
      ),
      context,
      initialState,
    })
  })
