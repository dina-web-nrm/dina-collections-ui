import EditMammal from './viewModules/editMammal/Async'
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
    path: '/app/mammals/register',
    requireLoggedInUser: true,
  },
  {
    component: EditMammal,
    exact: false,
    icon: 'edit',
    name: 'editMammal',
    path: '/app/mammals/:id/edit',
    requireLoggedInUser: true,
  },
  {
    component: LookupMammals,
    exact: true,
    icon: 'search',
    name: 'lookupMammals',
    path: '/app/mammals/lookup',
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
