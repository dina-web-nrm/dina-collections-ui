import createHistory from 'history/createBrowserHistory'

const history = createHistory()

const config = {
  api: {
    enableEndpointMocks: process.env.REACT_APP_ENABLE_ENDPOINT_MOCKS === 'true',
    endpointKeyPathnameMap: {
      GET_USER: '/auth/realms/dina/protocol/openid-connect/userinfo',
      LOG_IN: '/auth/realms/dina/protocol/openid-connect/token',
      LOOKUP_MAMMALS: 'TBD',
      REGISTER_MAMMAL: 'TBD',
    },
  },
  devToolsExtension:
    process.env.NODE_ENV === 'development' &&
    typeof devToolsExtension === 'function',
  i18n: {
    availableLanguages: ['en', 'sv'],
    defaultLanguage: 'en',
    language: 'sv',
    translations: {
      common: {
        yes: {
          en: 'yes',
          sv: 'ja',
        },
      },
    },
  },
  logger: {
    collapsed: true,
    diff: true,
  },
  routing: history,
  size: {
    // maxWidts from https://semantic-ui.com/elements/container.html
    breakpoints: [
      {
        maxWidth: 768,
        size: 'small',
      },
      {
        maxWidth: 1200,
        size: 'medium',
      },
      {
        size: 'large',
      },
    ],
  },
}

export default config
