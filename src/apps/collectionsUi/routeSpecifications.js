import About from './viewModules/about/Async'
import Home from './viewModules/home/Async'
import LookupMammals from './viewModules/lookupMammals/Async'
import RegisterMammal from './viewModules/registerMammal/Async'
import Settings from './viewModules/settings/Async'
import Login from './viewModules/login/Async'

export default [
  {
    component: Home,
    exact: true,
    icon: 'home',
    name: 'home',
    path: '/app',
    requireLoggedInUser: true,
  },
  {
    component: RegisterMammal,
    exact: true,
    icon: 'plus',
    name: 'registerMammal',
    path: '/app/registerMammal',
    requireLoggedInUser: true,
  },
  {
    component: About,
    exact: true,
    icon: 'theme',
    name: 'about',
    path: '/app/about-us',
    requireLoggedInUser: true,
  },
  {
    component: Login,
    exact: true,
    name: 'login',
    path: '/login',
    requireLoggedOutUser: true,
  },
  {
    component: Settings,
    exact: true,
    icon: 'setting',
    name: 'settings',
    path: '/app/settings',
    push: true,
    requireLoggedInUser: true,
  },
]
