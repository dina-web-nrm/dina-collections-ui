import createHistory from 'history/createMemoryHistory'

export default function createConfig() {
  const history = createHistory()

  return {
    api: {
      enableEndpointMocks: true,
      endpointKeyPathnameMap: {
        GET_USER: '/auth/realms/dina/protocol/openid-connect/userinfo',
        LOG_IN: '/auth/realms/dina/protocol/openid-connect/token',
      },
    },
    i18n: {
      availableLanguages: ['en', 'sv'],
      defaultLanguage: 'en',
      language: 'en',
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
}
