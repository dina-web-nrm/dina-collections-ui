/* eslint-disable import/no-extraneous-dependencies */
import React from 'react'
import { storiesOf } from '@storybook/react'
import 'semantic-ui/dist/semantic.css' // eslint-disable-line
import setupStorybookComponent from 'utilities/test/setupStorybookComponent'
import ModuleTranslate from './ModuleTranslate'

const initialState = {
  i18n: {
    availableLanguages: ['en', 'sv'],
    defaultLanguage: 'sv',
    language: 'sv',
    translations: {
      modules: {
        testModule: {
          firstName: {
            en: 'first name',
            sv: 'förnamn',
          },
          lastName: {
            en: 'lastname',
            sv: 'efternamn',
          },
        },
      },
    },
  },
}

storiesOf('coreModules/i18n/ModuleTranslate', module)
  .add('Default', () => {
    return setupStorybookComponent({
      component: <ModuleTranslate module="testModule" textKey="firstName" />,
      initialState,
    })
  })
  .add('Not existing', () => {
    return setupStorybookComponent({
      component: <ModuleTranslate module="notExisting" textKey="firstName" />,
      initialState,
    })
  })
  .add('Multile modules', () => {
    return setupStorybookComponent({
      component: (
        <ModuleTranslate
          modules={['notExisting', 'testModule']}
          textKey="firstName"
        />
      ),
      initialState,
    })
  })
