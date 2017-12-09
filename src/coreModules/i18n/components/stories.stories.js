/* eslint-disable import/no-extraneous-dependencies */
import React from 'react'
import { storiesOf } from '@storybook/react'
import { createProvider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'
import {
  boolean,
  object,
  select,
  text,
  withKnobs,
} from '@storybook/addon-knobs'
import 'semantic-ui/dist/semantic.css' // eslint-disable-line
import defaultTestConfig from 'utilities/test/defaultTestConfig'
import createTestStore from 'utilities/test/createTestStore'
import {
  createModuleTranslate,
  I18nProvider,
  LanguageSelect,
  Translate,
} from './index'

const config = defaultTestConfig()

storiesOf('coreModules/i18n/Translate', module)
  .addDecorator(withKnobs)
  .add('Default', () => {
    const Provider = createProvider()

    const capitalize = boolean('capitalize', false)
    const language = select(
      'language',
      {
        en: 'en',
        sv: 'sv',
      },
      'en'
    )

    const textKey = text('textKey', 'lastName')
    const store = createTestStore({
      config: {
        ...config,
        i18n: {
          ...config.i18n,
          language,
        },
      },
      initialState: {
        i18n: {
          availableLanguages: ['en', 'sv'],
          markdown: {},
          translations: {
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
    })
    return (
      <Provider store={store}>
        <ConnectedRouter history={config.routing}>
          <I18nProvider>
            <Translate capitalize={capitalize} textKey={textKey} />
          </I18nProvider>
        </ConnectedRouter>
      </Provider>
    )
  })
  .addDecorator(withKnobs)
  .add('Interpolation', () => {
    const Provider = createProvider()

    const capitalize = boolean('capitalize', false)
    const language = select(
      'language',
      {
        en: 'en',
        sv: 'sv',
      },
      'en'
    )

    const params = object('params', { name: 'Anton' })

    const textKey = text('textKey', 'greet')

    const store = createTestStore({
      config: {
        ...config,
        i18n: {
          ...config.i18n,
          language,
        },
      },
      initialState: {
        i18n: {
          translations: {
            greet: {
              en: 'hello {{name}}', // eslint-disable-line no-template-curly-in-string
              sv: 'hej {{name}}', // eslint-disable-line no-template-curly-in-string
            },
          },
        },
      },
    })

    return (
      <Provider store={store}>
        <ConnectedRouter history={config.routing}>
          <I18nProvider>
            <Translate
              capitalize={capitalize}
              params={params}
              textKey={textKey}
            />
          </I18nProvider>
        </ConnectedRouter>
      </Provider>
    )
  })

storiesOf('coreModules/i18n/createModuleTranslate', module)
  .addDecorator(withKnobs)
  .add('Default', () => {
    const Provider = createProvider()

    const capitalize = boolean('capitalize', false)

    const language = select(
      'language',
      {
        en: 'en',
        sv: 'sv',
      },
      'en'
    )

    const moduleName = select(
      'module',
      {
        commonUi: 'commonUi',
        otherUi: 'otherUi',
      },
      'commonUi'
    )

    const textKey = text('textKey', 'firstName')

    const Component = createModuleTranslate(moduleName)

    const store = createTestStore({
      config: {
        ...config,
        i18n: {
          ...config.i18n,
          language,
        },
      },
      initialState: {
        i18n: {
          availableLanguages: ['en', 'sv'],
          markdown: {},
          translations: {
            modules: {
              commonUi: {
                firstName: {
                  en: 'first name',
                  sv: 'förnamn',
                },
                lastName: {
                  en: 'lastname',
                  sv: 'efternamn',
                },
              },
              otherUi: {
                firstName: {
                  en: 'first name other module',
                  sv: 'förnamn annan modul',
                },
                lastName: {
                  en: 'lastname other ui',
                  sv: 'efternamn other module',
                },
              },
            },
          },
        },
      },
    })
    return (
      <Provider store={store}>
        <ConnectedRouter history={config.routing}>
          <I18nProvider>
            <Component capitalize={capitalize} textKey={textKey} />
          </I18nProvider>
        </ConnectedRouter>
      </Provider>
    )
  })

storiesOf('coreModules/i18n/LanguageSelect', module)
  .addDecorator(withKnobs)
  .add('Default', () => {
    const Provider = createProvider()
    const language = select(
      'language',
      {
        en: 'en',
        sv: 'sv',
      },
      'en'
    )

    const store = createTestStore({
      config: {
        ...config,
        i18n: {
          ...config.i18n,
          language,
        },
      },
      initialState: {
        i18n: {
          availableLanguages: ['en', 'sv'],
          markdown: {},
          translations: {
            greet: {
              en: 'hello {{name}}', // eslint-disable-line no-template-curly-in-string
              sv: 'hej {{name}}', // eslint-disable-line no-template-curly-in-string
            },
          },
        },
      },
    })

    return (
      <Provider store={store}>
        <ConnectedRouter history={config.routing}>
          <I18nProvider>
            <LanguageSelect />
          </I18nProvider>
        </ConnectedRouter>
      </Provider>
    )
  })
