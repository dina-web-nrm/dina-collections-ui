import 'semantic-ui/dist/semantic.css' // eslint-disable-line
import 'whatwg-fetch'
import createStore from 'store/index'
import { protectRoutes } from 'modules/user/utilities'
import { I18nProvider } from 'modules/i18n/components'

import React from 'react'
import ReactDOM from 'react-dom'
import { ConnectedRouter } from 'react-router-redux'
import { Provider as ReduxProvider } from 'react-redux'
import registerServiceWorker from 'registerServiceWorker'

import App from './App/Sync'
import routeSpecifications from './routeSpecifications'
import config from './config'
import modules from './initialModules'

const viewOrder = ['app', 'about', 'home', 'login', 'settings']

const store = createStore({ config, modules, viewOrder })

const routes = protectRoutes(routeSpecifications)

ReactDOM.render(
  <ReduxProvider store={store}>
    <I18nProvider>
      <ConnectedRouter history={config.routing}>
        <div>
          <App routes={routes} />
        </div>
      </ConnectedRouter>
    </I18nProvider>
  </ReduxProvider>,
  document.getElementById('root')
)

registerServiceWorker()
